import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-scroll-top',
  styleUrl: './scroll-top.scss',
  templateUrl: './scroll-top.html',
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class ScrollTop {
  public visible=signal(false);

  onScroll(){
    this.visible.set(window.scrollY>400);
  }

  scrollToTop(){
    window.scrollTo({top:0, behavior:'smooth'})
  }
}
