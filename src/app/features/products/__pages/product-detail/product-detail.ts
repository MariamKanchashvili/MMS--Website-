import { Component, computed, input, linkedSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PRODUCTS, getProduct } from '../../../../data/products';
import { getManufacturer } from '../../../../data/manufacturers';
import { CONTACT_INFO } from '../../../../data/contact-info';
import { ProductCard } from '../../__components/product-card/product-card';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, RouterLink, TranslatePipe, ProductCard],
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
}
