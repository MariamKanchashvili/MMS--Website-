import { Component, ElementRef, afterNextRender, signal, viewChild } from '@angular/core';import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company',
  imports: [NgOptimizedImage, RouterLink, TranslatePipe],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company {

  // ===== ციფრები =====
  // value: საბოლოო რიცხვი, suffix: რა მიეწერება ბოლოში
  stats = [
    { value: 20,  suffix: '+', label: 'COMPANY_PAGE.STAT_SUPPLIERS' },
    { value: 500, suffix: '+', label: 'COMPANY_PAGE.STAT_PRODUCTS' },
    { value: 25,  suffix: '+', label: 'COMPANY_PAGE.STAT_CLINICS' },
    { value: new Date().getFullYear() - 2016, suffix: '', label: 'COMPANY_PAGE.STAT_YEARS' },
  ];

  // ეკრანზე ნაჩვენები რიცხვები: თავიდან ყველა 0, ანიმაციისას იზრდება
  counts = signal<number[]>(Array(this.stats.length).fill(0));

  // HTML-ის #statsSection ელემენტი
  statsSection = viewChild.required<ElementRef<HTMLElement>>('statsSection');

  // ===== რატომ ჩვენ =====
  whyUs = [
    { title: 'COMPANY_PAGE.WHY_1_TITLE', text: 'COMPANY_PAGE.WHY_1_TEXT' },
    { title: 'COMPANY_PAGE.WHY_2_TITLE', text: 'COMPANY_PAGE.WHY_2_TEXT' },
    { title: 'COMPANY_PAGE.WHY_3_TITLE', text: 'COMPANY_PAGE.WHY_3_TEXT' },
    { title: 'COMPANY_PAGE.WHY_4_TITLE', text: 'COMPANY_PAGE.WHY_4_TEXT' },
    { title: 'COMPANY_PAGE.WHY_5_TITLE', text: 'COMPANY_PAGE.WHY_5_TEXT' },
    { title: 'COMPANY_PAGE.WHY_6_TITLE', text: 'COMPANY_PAGE.WHY_6_TEXT' },
  ];

  // ===== სერტიფიკატები =====
  certificates = [
    'COMPANY_PAGE.CERT_1',
    'COMPANY_PAGE.CERT_2',
    'COMPANY_PAGE.CERT_3',
    'COMPANY_PAGE.CERT_4',
  ];

  constructor() {
  afterNextRender(() => {
    // გვატყობინებს, როცა ციფრების ზოლი ეკრანზე გამოჩნდება
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.animateCounts();   // დათვლა იწყება მხოლოდ ახლა
          observer.disconnect();  // ერთხელ საკმარისია
        }
      },
      { threshold: 0.4 }          // როცა ზოლის 40% ჩანს
    );

    observer.observe(this.statsSection().nativeElement);
  });
}

  // რიცხვები 0-დან საბოლოო მნიშვნელობამდე „ითვლება“ 1.6 წამში
  private animateCounts() {
    // ვისაც ანიმაციები გამორთული აქვს: პირდაპირ საბოლოო რიცხვები
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.counts.set(this.stats.map(s => s.value));
      return;
    }

    const duration = 2100;               // მილიწამები
    const start = performance.now();     // დაწყების მომენტი

    const step = (now: number) => {
      // progress: 0 (დასაწყისი) → 1 (დასასრული)
      const progress = Math.min((now - start) / duration, 1);
      // ბოლოსკენ ნელდება, უფრო ბუნებრივად გამოიყურება
      const eased = 1 - Math.pow(1 - progress, 3);

      this.counts.set(this.stats.map(s => Math.round(s.value * eased)));

      // თუ ჯერ არ დასრულებულა, შემდეგი კადრი
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}