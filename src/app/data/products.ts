import { DirectionId } from './catalog';

// =========================================
// პროდუქტები
// ტექსტები (მოკლე აღწერა, აღწერა, მახასიათებლები) ka.json / en.json-შია:
//   PRODUCT.<id>.SHORT, PRODUCT.<id>.DESCRIPTION, PRODUCT.<id>.FEATURES
// =========================================

// ზომის პარამეტრი: სახელი თარგმანშია (PRODUCTS.SIZES.<param>)
export type SizeParam = 'diameter' | 'length' | 'width' | 'volume';

export interface ProductSize {
  param: SizeParam;   // რა იზომება
  range: string;      // დიაპაზონი: '2.25–4.0'
  unit: string;       // ერთეული: 'mm', 'ml'
}

export interface ProductDocument {
  type: 'ifu' | 'brochure' | 'certificate';   // სახელი თარგმანშია (PRODUCTS.DOCS.<type>)
  file: string;                                // 'docs/onyx-truecor-ifu.pdf'
}

export interface Product {
  id: string;                  // URL-ში: /products/onyx-truecor (პატარა ასოები, ტირე)
  name: string;                // ორივე ენაზე ერთნაირი
  direction: DirectionId;
  category: string;            // catalog.ts-ის კატეგორიის id
  manufacturer: string;        // manufacturers.ts-ის id
  image?: string;              // მთავარი ფოტო (არასავალდებულო)
  gallery?: string[];          // დამატებითი ფოტოები (არასავალდებულო)
  sizes: ProductSize[];
  documents?: ProductDocument[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'onyx-trucor',
    name: 'Onyx Trucor',
    direction: 'coronary',
    category: 'stent',
    manufacturer: 'medtronic',
    // image: 'images/products/onyx-truecor.webp',
    // gallery: ['images/products/onyx-truecor-2.webp'],
    sizes: [
      { param: 'diameter', range: '2.25–5.0', unit: 'mm' },
      { param: 'length',   range: '8–38',     unit: 'mm' },
    ],
    // documents: [{ type: 'ifu', file: 'docs/onyx-truecor-ifu.pdf' }],
  },
];

// id-ით პროდუქტის პოვნა
export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}
