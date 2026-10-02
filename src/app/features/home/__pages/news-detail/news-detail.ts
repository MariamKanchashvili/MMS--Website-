import { Component, computed, input, linkedSignal } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NEWS } from '../../../../data/news';
import { NewsCard } from '../../__components/news-card/news-card';
import { Lightbox } from '../../../../shared/lightbox/lightbox';

@Component({
  selector: 'app-news-detail',
  imports: [DatePipe, NgOptimizedImage, RouterLink, TranslatePipe, NewsCard, Lightbox],
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.scss',
})
export class NewsDetail {
  id = input<string>();   // /news/n1 → 'n1'

  // მიმდინარე სიახლე
  news = computed(() => NEWS.find(item => item.id === this.id()));

  // სხვა სიახლეები: ყველა, მიმდინარის გარდა, მაქსიმუმ 3
  otherNews = computed(() =>
    NEWS.filter(item => item.id !== this.id()).slice(0, 3)
  );

  // ყველა ფოტო ერთ სიაში: მთავარი (0) + გალერეა (1, 2, ...)
  images = computed(() => {
    const n = this.news();
    return n ? [n.image, ...(n.gallery ?? [])] : [];
  });

  // რომელი ფოტოა გახსნილი ლაითბოქსში. null = დახურულია.
  // linkedSignal: სხვა სიახლეზე გადასვლისას ავტომატურად იხურება
  lightboxIndex = linkedSignal<number | null>(() => {
    this.news();
    return null;
  });
}