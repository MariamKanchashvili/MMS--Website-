import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PRODUCTS, getProduct } from '../../../../data/products';
import { getManufacturer } from '../../../../data/manufacturers';
import { CONTACT_INFO } from '../../../../data/contact-info';
import { ProductCard } from '../../__components/product-card/product-card';
import { Lightbox } from '../../../../shared/lightbox/lightbox';
@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, RouterLink, TranslatePipe, ProductCard,Lightbox],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  // /products/onyx-truecor → id() = 'onyx-truecor'
  id = input<string>();

  contact = CONTACT_INFO;

  // მიმდინარე პროდუქტი
  product = computed(() => getProduct(this.id() ?? ''));

  // მისი მწარმოებელი
  manufacturer = computed(() => {
    const p = this.product();
    return p ? getManufacturer(p.manufacturer) : undefined;
  });

  // ყველა ფოტო ერთ სიაში: მთავარი + გალერეა
  images = computed(() => {
    const p = this.product();
    if (!p?.image) return [];
    return [p.image, ...(p.gallery ?? [])];
  });

  // არჩეული ფოტოს ნომერი.
  // linkedSignal: სხვა პროდუქტზე გადასვლისას ავტომატურად ბრუნდება 0-ზე (პირველ ფოტოზე)
  selectedImage = linkedSignal(() => {
    this.product();
    return 0;
  });

  // მსგავსი პროდუქტები: ჯერ იგივე კატეგორია, შემდეგ იგივე მიმართულება, მაქსიმუმ 3
  related = computed(() => {
    const p = this.product();
    if (!p) return [];

    const others = PRODUCTS.filter(x => x.id !== p.id);
    const sameCategory = others.filter(x => x.category === p.category);
    const sameDirection = others.filter(x => x.direction === p.direction && x.category !== p.category);

    return [...sameCategory, ...sameDirection].slice(0, 3);
  });

  // ტექსტს ხაზებად ყოფს: 'ა\nბ\nგ' → ['ა', 'ბ', 'გ'] (მახასიათებლების სიისთვის)
  toLines(text: string): string[] {
    return text.split('\n').filter(line => line.trim() !== '');
  }

  
  // დეტალურ გვერდზე სურათის გადიდება : 


 lightboxOpen = signal(false);
  // გადიდების წერტილი: თავიდან ცენტრი
  zoomOrigin = signal('50% 50%');
 // კურსორის მოძრაობისას: ვითვლით, ფოტოს რომელ წერტილზეა (პროცენტებში)
  onZoomMove(event: MouseEvent) {
    // ფოტოს ჩარჩოს პოზიცია და ზომა ეკრანზე
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();

    // კურსორის მდებარეობა ჩარჩოს შიგნით: 0% (მარცხენა/ზედა) → 100% (მარჯვენა/ქვედა)
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;

    this.zoomOrigin.set(`${x}% ${y}%`);
  }

  // კურსორი გავიდა: ისევ ცენტრი
  resetZoom() {
    this.zoomOrigin.set('50% 50%');
  }

}
