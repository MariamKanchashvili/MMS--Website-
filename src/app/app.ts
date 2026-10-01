import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header-component/header-component';
import { FooterComponent } from './shared/layout/footer-component/footer-component';
import { ScrollTop } from './shared/scroll-top/scroll-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollTop],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mmsSite');
}
