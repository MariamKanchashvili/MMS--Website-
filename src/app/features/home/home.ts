import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SUPPLIERS } from '../../data/suppliers';
import { NEWS } from '../../data/news';

@Component({
  imports: [RouterLink,TranslatePipe,DatePipe,NgOptimizedImage],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  public suppliers=SUPPLIERS;
  public latestNews=NEWS[0] //ბოლო სიახლე 
}
