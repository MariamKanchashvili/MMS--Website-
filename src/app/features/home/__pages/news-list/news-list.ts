import { Component } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NEWS } from '../../../../data/news';
import { NewsCard } from '../../__components/news-card/news-card';

@Component({
  imports: [DatePipe, NgOptimizedImage, RouterLink, TranslatePipe,NewsCard],
  selector: 'app-news-list',
  styleUrl: './news-list.scss',
  templateUrl: './news-list.html',
})
export class NewsList {
  public news=NEWS
}
