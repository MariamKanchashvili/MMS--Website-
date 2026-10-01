import { Component } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NEWS } from '../../../../data/news';

@Component({
  imports: [DatePipe, NgOptimizedImage, RouterLink, TranslatePipe],
  selector: 'app-news-list',
  styleUrl: './news-list.scss',
  templateUrl: './news-list.html',
})
export class NewsList {
  public news=NEWS
}
