import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    // სია ფილტრებით: /products, /products?direction=coronary ...
    path: 'products',
    loadComponent: () => import('./products').then(m => m.Products),
  },
  {
    // დეტალური გვერდი: /products/onyx-truecor
    path: 'products/:id',
    loadComponent: () => import('./__pages/product-detail/product-detail').then(m => m.ProductDetail),
  },
];
