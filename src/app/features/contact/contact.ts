import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CONTACT_INFO } from '../../data/contact-info';
import { TEAM } from '../../data/team';

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage, RouterLink, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  // კომპანიის ზოგადი ტელეფონი / ელ-ფოსტა
  contact = CONTACT_INFO;

  // ერთი სიიდან ორ ჯგუფს ვქმნით
  leadership = TEAM.filter(m => m.group === 'leadership');
  managers   = TEAM.filter(m => m.group === 'managers');

  // '+995 599 21 17 71' → 'tel:+995599211771'
  phoneLink(phone: string): string {
    return 'tel:' + phone.replace(/\s/g, '');
  }
}