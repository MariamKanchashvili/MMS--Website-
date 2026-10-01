import { Component, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import type { NewsItem } from '../../../../data/news';

@Component({
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, DatePipe, TranslatePipe],
  selector: 'app-news-card',
  styleUrl: './news-card.scss',
  templateUrl: './news-card.html',
})
export class NewsCard {
  news = input.required<NewsItem>();
}
