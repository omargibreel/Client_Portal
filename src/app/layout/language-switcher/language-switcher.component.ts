import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, AppLanguage } from '../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-switcher" role="group" aria-label="Language selector">
      <button 
        type="button"
        class="lang-btn"
        [class.active]="langService.currentLang() === 'en'"
        (click)="setLang('en')"
        aria-label="Switch to English"
        [attr.aria-pressed]="langService.currentLang() === 'en'"
      >
        EN
      </button>
      <span class="divider" aria-hidden="true">|</span>
      <button 
        type="button"
        class="lang-btn ar-btn"
        [class.active]="langService.currentLang() === 'ar'"
        (click)="setLang('ar')"
        aria-label="التبديل إلى اللغة العربية"
        [attr.aria-pressed]="langService.currentLang() === 'ar'"
      >
        العربية
      </button>
    </div>
  `,
  styles: [`
    .lang-switcher {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(255, 248, 203, 0.12);
      border: 1px solid rgba(255, 248, 203, 0.25);
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-full);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .lang-btn {
      color: var(--color-cream-200);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.2rem 0.45rem;
      border-radius: var(--radius-full);
      transition: var(--transition-standard);
      opacity: 0.75;

      &:hover {
        opacity: 1;
        background: rgba(255, 248, 203, 0.2);
      }

      &.active {
        opacity: 1;
        background: var(--color-cream-200);
        color: var(--color-primary-900);
        font-weight: 800;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
    }

    .ar-btn {
      font-family: 'Cairo', 'Tajawal', sans-serif;
      font-size: 0.82rem;
    }

    .divider {
      color: rgba(255, 248, 203, 0.35);
      font-size: 0.75rem;
      user-select: none;
    }
  `]
})
export class LanguageSwitcherComponent {
  readonly langService = inject(LanguageService);

  setLang(lang: AppLanguage): void {
    this.langService.switchLanguage(lang);
  }
}
