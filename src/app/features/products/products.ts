import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { CATEGORIES, DIRECTIONS } from '../../data/catalog';
import { MANUFACTURERS, getManufacturer } from '../../data/manufacturers';
import { PRODUCTS, Product } from '../../data/products';
import { ProductCard } from './__components/product-card/product-card';
// ერთ გვერდზე ნაჩვენები პროდუქტების რაოდენობა
const PAGE_SIZE = 12;

@Component({
  selector: 'app-products',
  imports: [TranslatePipe, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private router = inject(Router);

 
 private translate = inject(TranslateService);

  // მიმდინარე ენა სიგნალად: ენის შეცვლისას ძებნა თავიდან დაითვლება
  private lang = toSignal(
    this.translate.onLangChange.pipe(map(event => event.lang)),
    { initialValue: this.translate.getCurrentLang() ?? 'ka' }
  );


  // ===== ფილტრები URL-იდან =====
  // /products?direction=coronary&category=stent → direction() = 'coronary', category() = 'stent'
  // ეს ავტომატურად ხდება withComponentInputBinding()-ის წყალობით (app.config.ts)
  direction = input<string>();
  category = input<string>();
  manufacturer = input<string>();
  q = input<string>();       // ძებნის ტექსტი
  page = input<string>();    // გვერდის ნომერი

  // ===== სიები ფილტრებისთვის =====
  directions = DIRECTIONS;
  manufacturers = MANUFACTURERS;

  // არჩეული მიმართულების კატეგორიები
  categories = computed(() =>
    CATEGORIES.filter(c => c.direction === this.direction())
  );

  // ქვეჯგუფები (მაგ. ორთოპედიაში: 'hip', 'spine'). new Set() იმეორებულს აშორებს
  groups = computed(() =>
    [...new Set(this.categories().map(c => c.group).filter((g): g is string => !!g))]
  );

  // კატეგორიები ქვეჯგუფის გარეშე (მაგ. კორონარული, ესთეტიკა)
  ungrouped = computed(() => this.categories().filter(c => !c.group));

  // კონკრეტული ქვეჯგუფის კატეგორიები
  categoriesOf(group: string) {
    return this.categories().filter(c => c.group === group);
  }

    // ===== ფილტრაცია =====
  filtered = computed(() => {
    const search = (this.q() ?? '').trim().toLowerCase();
    this.lang();   // ენის შეცვლაზე რეაგირება

    return PRODUCTS.filter(p =>
      (!this.direction()    || p.direction === this.direction()) &&
      (!this.category()     || p.category === this.category()) &&
      (!this.manufacturer() || p.manufacturer === this.manufacturer()) &&
      (!search              || this.searchText(p).includes(search))
    );
  });

  // ტექსტი, რომელშიც ძებნა ხდება: დასახელება, მწარმოებელი,
  // მიმართულება, კატეგორია და აღწერა, მიმდინარე ენაზე.
  // instant() თარგმანს მაშინვე აბრუნებს (როგორც | translate, ოღონდ .ts-ში)
  private searchText(p: Product): string {
    return [
      p.name,
      getManufacturer(p.manufacturer)?.name ?? '',
      this.translate.instant('PRODUCTS.DIRECTIONS.' + p.direction),
      this.translate.instant('PRODUCTS.CATEGORIES.' + p.category),
      this.translate.instant('PRODUCT.' + p.id + '.DESCRIPTION'),
    ].join(' ').toLowerCase();
  }

  // ===== გვერდებად დაყოფა =====
  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  // მიმდინარე გვერდი: 1-დან totalPages-მდე (არასწორი ნომერი URL-ში ვერაფერს გააფუჭებს)
  currentPage = computed(() =>
    Math.min(Math.max(1, Number(this.page()) || 1), this.totalPages())
  );

  // მხოლოდ მიმდინარე გვერდის პროდუქტები
  pageItems = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  // [1, 2, 3, ...] გვერდების ღილაკებისთვის
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  // არჩეულია თუ არა რომელიმე ფილტრი
  hasFilters = computed(() =>
    !!(this.direction() || this.category() || this.manufacturer() || this.q())
  );

  // ===== ფილტრის შეცვლა =====
  // URL-ს ვცვლით, დანარჩენს (input → computed → HTML) Angular თავად აკეთებს.
  // null ნიშნავს: ეს პარამეტრი URL-იდან წაშალე.
  private update(params: Record<string, string | number | null>, replaceUrl = false) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',   // სხვა პარამეტრები დარჩეს
      replaceUrl,
    });
  }

  setDirection(id: string | null) {
    // მიმართულების შეცვლისას კატეგორია და გვერდი ნულდება
    this.update({ direction: id, category: null, page: null });
  }

  setCategory(id: string) {
    // იგივეზე მეორედ დაჭერა = მოხსნა
    this.update({ category: this.category() === id ? null : id, page: null });
  }

  setManufacturer(id: string) {
    this.update({ manufacturer: id || null, page: null });
  }

  setSearch(text: string) {
    // replaceUrl: ყოველი ასო ისტორიაში არ ჩაიწეროს („უკან" ღილაკისთვის)
    this.update({ q: text.trim() || null, page: null }, true);
  }

  goToPage(n: number) {
    this.update({ page: n === 1 ? null : n });
  }

  reset() {
    this.router.navigate([], { queryParams: {} });
  }
}
