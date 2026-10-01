import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, TranslatePipe,RouterLinkActive],
  selector: 'app-footer-component',
  styleUrl: './footer-component.scss',
  templateUrl: './footer-component.html',
})
export class FooterComponent {
   year = new Date().getFullYear(); 
}
