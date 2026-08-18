import { Injectable, inject, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly document = inject(DOCUMENT) as Document;
  private readonly translate = inject(TranslateService);
  
  private readonly STORAGE_KEY = 'buildora_lang';
  
  // Reactive Signal for active language
  readonly currentLang = signal<AppLanguage>(this.getInitialLanguage());
  readonly currentDir = computed<Direction>(() => (this.currentLang() === 'ar' ? 'rtl' : 'ltr'));
  readonly isArabic = computed<boolean>(() => this.currentLang() === 'ar');

  constructor() {
    // Set default and fallback
    this.translate.setDefaultLang('en');
    
    // Apply initial language & direction to DOM
    this.applyLanguage(this.currentLang());
  }

  /**
   * Switches language at runtime and updates document direction
   */
  public switchLanguage(lang: AppLanguage): void {
    if (this.currentLang() === lang) return;
    this.currentLang.set(lang);
    this.applyLanguage(lang);
  }

  /**
   * Toggles between English and Arabic
   */
  public toggleLanguage(): void {
    const nextLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.switchLanguage(nextLang);
  }

  private applyLanguage(lang: AppLanguage): void {
    // 1. Update ngx-translate
    this.translate.use(lang);
    
    // 2. Persist to localStorage
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch {
      // Fallback if storage unavailable
    }

    // 3. Update HTML root attributes (dir and lang)
    const html = this.document.documentElement;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    html.setAttribute('dir', dir);
    html.setAttribute('lang', lang);

    // 4. Update body class for styling if needed
    if (lang === 'ar') {
      this.document.body.classList.add('rtl');
      this.document.body.classList.remove('ltr');
    } else {
      this.document.body.classList.add('ltr');
      this.document.body.classList.remove('rtl');
    }
  }

  private getInitialLanguage(): AppLanguage {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY) as AppLanguage;
      if (saved === 'en' || saved === 'ar') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }

    // Check browser preference if none saved
    if (typeof navigator !== 'undefined' && navigator.language?.startsWith('ar')) {
      return 'ar';
    }

    return 'en';
  }
}
