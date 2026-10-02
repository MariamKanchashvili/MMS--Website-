import { Component, DOCUMENT, OnDestroy, computed, inject, input, linkedSignal, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-lightbox',
  imports: [TranslatePipe],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
  host: {
    // კლავიატურა: Escape = დახურვა, ისრები = წინა / შემდეგი
    '(document:keydown.escape)': 'close()',
    '(document:keydown.arrowleft)': 'prev()',
    '(document:keydown.arrowright)': 'next()',
  },
})
export class Lightbox implements OnDestroy {
  private document = inject(DOCUMENT);

  // ===== გარედან =====
  images = input.required<string[]>();   // ყველა ფოტო
  start = input(0);                      // რომელი ფოტოდან გაიხსნას
  alt = input('');                       // ფოტოს აღწერა (პროდუქტის სახელი)

  // დახურვისას მშობელს ვატყობინებთ: (closed)="..."
  closed = output<void>();

  // ===== შიდა მდგომარეობა =====
  // მიმდინარე ფოტოს ნომერი: თავიდან = start
  current = linkedSignal(() => this.start());

  hasMany = computed(() => this.images().length > 1);

  // თითის მოძრაობის (swipe) საწყისი წერტილი
  private touchStartX = 0;

  constructor() {
    // ღია ლაითბოქსის დროს გვერდი უკან არ სქროლავს
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    // დახურვისას სქროლი ბრუნდება
    this.document.body.style.overflow = '';
  }

  close() {
    this.closed.emit();
  }

  // % length: ბოლოდან პირველზე და პირველიდან ბოლოზე გადადის (წრიულად)
  next() {
    const n = this.images().length;
    this.current.update(i => (i + 1) % n);
  }

  prev() {
    const n = this.images().length;
    this.current.update(i => (i - 1 + n) % n);
  }

  // ===== ტელეფონზე თითით გადაფურცვლა =====
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const distance = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(distance) < 50) return;   // ძალიან მოკლე მოძრაობა = შემთხვევითი შეხება
    if (distance < 0) this.next();          // მარცხნივ გადაფურცვლა → შემდეგი
    else this.prev();                       // მარჯვნივ → წინა
  }
}