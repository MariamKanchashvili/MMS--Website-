import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  selector: 'app-header-component',
  styleUrl: './header-component.scss',
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  private translateService=inject(TranslateService);

  public selectedLanguage = signal('ka');
  public isMenuOpen=signal(false);

  switchLanguage(language:string){
    this.translateService.use(language);
    this.selectedLanguage.set(language);
    this.closeMenu();
  }

  toggleMenu():void{
    this.isMenuOpen.update(open=>!open);
  }

  closeMenu():void{
    this.isMenuOpen.set(false);
  }
}
