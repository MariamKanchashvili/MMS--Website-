import { Component, computed, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NEWS } from '../../../../data/news';
import { NewsCard } from '../../__components/news-card/news-card';

@Component({
  selector: 'app-news-detail',
  imports: [DatePipe, NgOptimizedImage, RouterLink, TranslatePipe, NewsCard],
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
}