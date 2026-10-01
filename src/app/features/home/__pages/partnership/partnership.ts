import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  imports: [NgOptimizedImage, RouterLink, TranslatePipe],
  selector: 'app-partnership',
  styleUrl: './partnership.scss',
  templateUrl: './partnership.html',
})
export class Partnership {
  // ვისთან ვთანამშრომლობთ.
  // აქ თავად ტექსტი კი არა, თარგმანის key-ებია.
  // ტექსტი ka.json / en.json-შია და ენის მიხედვით შეიცვლება.
  partners = [
    'PARTNERSHIP_PAGE.WHO_1',
    'PARTNERSHIP_PAGE.WHO_2',
    'PARTNERSHIP_PAGE.WHO_3',
  ];

  // რას სთავაზობს კომპანია პარტნიორს
  offers = [
    'PARTNERSHIP_PAGE.OFFER_1',
    'PARTNERSHIP_PAGE.OFFER_2',
    'PARTNERSHIP_PAGE.OFFER_3',
    'PARTNERSHIP_PAGE.OFFER_4',
  ];

  // პარტნიორობის პირობები
  terms = [
    'PARTNERSHIP_PAGE.TERM_1',
    'PARTNERSHIP_PAGE.TERM_2',
    'PARTNERSHIP_PAGE.TERM_3',
  ];

  // როგორ დავიწყოთ: თითო ნაბიჯს სათაურიც აქვს და ტექსტიც,
  // ამიტომ აქ ობიექტებია და არა უბრალოდ სტრიქონები
  steps = [
    { title: 'PARTNERSHIP_PAGE.STEP_1_TITLE', text: 'PARTNERSHIP_PAGE.STEP_1_TEXT' },
    { title: 'PARTNERSHIP_PAGE.STEP_2_TITLE', text: 'PARTNERSHIP_PAGE.STEP_2_TEXT' },
    { title: 'PARTNERSHIP_PAGE.STEP_3_TITLE', text: 'PARTNERSHIP_PAGE.STEP_3_TEXT' },
  ];
}
