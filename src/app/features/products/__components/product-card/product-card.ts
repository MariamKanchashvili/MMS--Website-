import { Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../../../data/products';
import { getManufacturer } from '../../../../data/manufacturers';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, RouterLink, TranslatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  // გარედან გადმოცემული პროდუქტი: <app-product-card [product]="p" />
  product = input.required<Product>();

  // მწარმოებლის სახელი id-ის მიხედვით ('medtronic' → 'Medtronic')
  manufacturerName = computed(() => getManufacturer(this.product().manufacturer)?.name ?? '');
}
