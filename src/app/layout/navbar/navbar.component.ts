import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { MagneticHoverDirective } from '../../core/directives/magnetic-hover.directive';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule, 
    LanguageSwitcherComponent,
    MagneticHoverDirective
  ],
  template: `
    <header class="navbar-wrapper" [class.is-scrolled]="isScrolled()">
      <div class="container navbar-container">
        <!-- Brand Logo -->
        <a routerLink="/" class="navbar-brand" aria-label="Buildora Home">
          <img src="assets/images/logo-cream.png" alt="Buildora" class="brand-logo-img">
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-links-desktop" aria-label="Main Navigation">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">
            {{ 'nav.home' | translate }}
          </a>
          <a href="#services" class="nav-link">
            {{ 'nav.services' | translate }}
          </a>
          <a href="#journey" class="nav-link">
            {{ 'nav.journey' | translate }}
          </a>
          <a href="#tech" class="nav-link">
            {{ 'nav.tech' | translate }}
          </a>
          <a href="#team" class="nav-link">
            {{ 'nav.team' | translate }}
          </a>
          <a routerLink="/contact" routerLinkActive="active" class="nav-link">
            {{ 'nav.contact' | translate }}
          </a>
        </nav>

        <!-- Right Utilities: Language Switcher + CTA -->
        <div class="navbar-actions">
          <app-language-switcher></app-language-switcher>

          <a 
            routerLink="/contact" 
            class="btn btn-cta btn-shiny"
            appMagneticHover
            [magneticStrength]="0.2"
          >
            {{ 'nav.cta' | translate }}
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            type="button" 
            class="mobile-toggle"
            [class.is-open]="isMobileMenuOpen()"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <span class="bar bar-1"></span>
            <span class="bar bar-2"></span>
            <span class="bar bar-3"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div 
        class="mobile-drawer" 
        [class.is-open]="isMobileMenuOpen()"
        [attr.aria-hidden]="!isMobileMenuOpen()"
      >
        <nav class="mobile-nav" aria-label="Mobile Navigation">
          <a routerLink="/" (click)="closeMobileMenu()" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="mobile-nav-link">
            {{ 'nav.home' | translate }}
          </a>
          <a href="#services" (click)="closeMobileMenu()" class="mobile-nav-link">
            {{ 'nav.services' | translate }}
          </a>
          <a href="#journey" (click)="closeMobileMenu()" class="mobile-nav-link">
            {{ 'nav.journey' | translate }}
          </a>
          <a href="#tech" (click)="closeMobileMenu()" class="mobile-nav-link">
            {{ 'nav.tech' | translate }}
          </a>
          <a href="#team" (click)="closeMobileMenu()" class="mobile-nav-link">
            {{ 'nav.team' | translate }}
          </a>
          <a routerLink="/contact" (click)="closeMobileMenu()" routerLinkActive="active" class="mobile-nav-link">
            {{ 'nav.contact' | translate }}
          </a>
          
          <div class="mobile-drawer-cta">
            <a routerLink="/contact" (click)="closeMobileMenu()" class="btn btn-primary btn-lg w-100">
              {{ 'nav.cta' | translate }}
            </a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      position: sticky;
      top: 0;
      inset-inline: 0;
      z-index: 1000;
      background-color: var(--color-nav-bg);
      color: var(--color-nav-text);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 20px rgba(28, 16, 23, 0.15);
      border-block-end: 1px solid rgba(255, 248, 203, 0.1);

      &.is-scrolled {
        background-color: rgba(100, 57, 81, 0.95);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 10px 30px rgba(28, 16, 23, 0.28);
      }
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
      gap: var(--space-4);
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      text-decoration: none;
      flex-shrink: 0;

      .brand-logo-img {
        height: 38px;
        width: auto;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.03);
        }
      }
    }

    .nav-links-desktop {
      display: flex;
      align-items: center;
      gap: var(--space-6);

      @media (max-width: 992px) {
        display: none;
      }
    }

    .nav-link {
      color: var(--color-cream-200);
      font-weight: 600;
      font-size: 0.95rem;
      padding-block: var(--space-2);
      position: relative;
      transition: color 0.2s ease;
      opacity: 0.88;

      &:hover {
        opacity: 1;
        color: #FFFFFF;
      }

      &.active {
        opacity: 1;
        color: #FFFFFF;
        font-weight: 700;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          inset-inline: 0;
          height: 3px;
          background-color: var(--color-accent-500);
          border-radius: var(--radius-full);
          box-shadow: 0 0 10px var(--color-accent-500);
        }
      }
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .btn-cta {
      background: linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-600) 100%);
      color: #FFFFFF;
      padding-inline: var(--space-5);
      padding-block: 0.65rem;
      font-size: 0.92rem;
      font-weight: 700;
      border-radius: var(--radius-md);
      box-shadow: 0 4px 14px rgba(201, 123, 74, 0.4);

      &:hover {
        box-shadow: 0 6px 20px rgba(201, 123, 74, 0.6);
        transform: translateY(-1px);
      }

      @media (max-width: 600px) {
        display: none;
      }
    }

    /* Hamburger Menu Button */
    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 32px;
      height: 28px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1100;

      @media (max-width: 992px) {
        display: flex;
      }

      .bar {
        width: 100%;
        height: 3px;
        background-color: var(--color-cream-200);
        border-radius: 4px;
        transition: all 0.3s ease;
      }

      &.is-open {
        .bar-1 {
          transform: translateY(9px) rotate(45deg);
        }
        .bar-2 {
          opacity: 0;
          transform: translateX(-10px);
        }
        .bar-3 {
          transform: translateY(-9px) rotate(-45deg);
        }
      }
    }

    /* Mobile Drawer */
    .mobile-drawer {
      display: none;
      position: absolute;
      top: 76px;
      inset-inline: 0;
      background: var(--color-primary-600);
      border-block-end: 2px solid var(--color-accent-500);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
      padding: var(--space-6);
      transform: translateY(-10px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      @media (max-width: 992px) {
        display: block;
      }

      &.is-open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .mobile-nav-link {
      color: var(--color-cream-200);
      font-size: 1.15rem;
      font-weight: 600;
      padding-block: var(--space-2);
      border-block-end: 1px solid rgba(255, 248, 203, 0.1);

      &:hover, &.active {
        color: #FFFFFF;
        padding-inline-start: var(--space-2);
      }
    }

    .mobile-drawer-cta {
      margin-block-top: var(--space-4);
      .w-100 {
        width: 100%;
      }
    }
  `]
})
export class NavbarComponent {
  readonly langService = inject(LanguageService);
  
  isScrolled = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled.set(scrollOffset > 30);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((val) => !val);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
