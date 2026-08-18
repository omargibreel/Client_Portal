import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-container">
        <!-- Brand Column -->
        <div class="footer-col footer-brand-col">
          <a routerLink="/" class="footer-logo-link" aria-label="Buildora">
            <img src="assets/images/logo-cream.png" alt="Buildora" class="footer-logo-img">
          </a>
          <p class="footer-tagline">
            {{ 'footer.tagline' | translate }}
          </p>
          <div class="footer-iti-badge">
            <span class="dot"></span>
            <span>ITI Intake 46 — Professional Development & CRM</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ 'footer.quickLinks' | translate }}</h4>
          <ul class="footer-links">
            <li><a routerLink="/">{{ 'nav.home' | translate }}</a></li>
            <li><a href="#services">{{ 'nav.services' | translate }}</a></li>
            <li><a href="#journey">{{ 'nav.journey' | translate }}</a></li>
            <li><a href="#tech">{{ 'nav.tech' | translate }}</a></li>
            <li><a href="#team">{{ 'nav.team' | translate }}</a></li>
            <li><a routerLink="/contact">{{ 'nav.contact' | translate }}</a></li>
          </ul>
        </div>

        <!-- Core Modules -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ 'services.badge' | translate }}</h4>
          <ul class="footer-links">
            <li><a href="#services">{{ 'services.items.setup.title' | translate }}</a></li>
            <li><a href="#services">{{ 'services.items.delivery.title' | translate }}</a></li>
            <li><a href="#services">{{ 'services.items.finance.title' | translate }}</a></li>
            <li><a href="#services">{{ 'services.items.documents.title' | translate }}</a></li>
            <li><a href="#services">{{ 'services.items.insights.title' | translate }}</a></li>
            <li><a href="#services">{{ 'services.items.alerts.title' | translate }}</a></li>
          </ul>
        </div>

        <!-- Direct Contact Column -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ 'contactPage.sidebar.title' | translate }}</h4>
          <p class="footer-contact-item">
            <span class="icon">✉</span>
            <a href="mailto:contact@buildora.app">contact&#64;buildora.app</a>
          </p>
          <p class="footer-contact-item">
            <span class="icon">✆</span>
            <span>+20 (100) 000-4646</span>
          </p>
          <div class="footer-cta-box">
            <a routerLink="/contact" class="btn btn-primary btn-sm w-100">
              {{ 'nav.cta' | translate }}
            </a>
          </div>
        </div>
      </div>

      <!-- Partner Tech Strip -->
      <div class="footer-tech-strip">
        <div class="container">
          <p class="tech-strip-text">
            {{ 'footer.techStrip' | translate }}
          </p>
        </div>
      </div>

      <!-- Copyright Bottom Bar -->
      <div class="footer-bottom-bar">
        <div class="container footer-bottom-container">
          <p class="copyright-text">
            {{ copyrightText() }}
          </p>
          <div class="footer-meta-links">
            <a routerLink="/contact">{{ 'footer.privacy' | translate }}</a>
            <span class="divider">·</span>
            <a routerLink="/contact">{{ 'footer.terms' | translate }}</a>
            <span class="divider">·</span>
            <a href="#security">{{ 'footer.security' | translate }}</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background-color: var(--color-footer-bg);
      color: var(--color-cream-100);
      padding-block-start: var(--space-16);
      border-block-start: 1px solid rgba(255, 248, 203, 0.12);
      position: relative;
    }

    .footer-container {
      display: grid;
      grid-template-columns: 2fr 1fr 1.2fr 1.4fr;
      gap: var(--space-10);
      padding-block-end: var(--space-12);

      @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .footer-logo-img {
      height: 42px;
      width: auto;
      margin-block-end: var(--space-4);
    }

    .footer-tagline {
      color: var(--color-primary-200);
      font-size: 0.95rem;
      max-width: 320px;
      line-height: 1.6;
      margin-block-end: var(--space-4);
    }

    .footer-iti-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      background: rgba(255, 248, 203, 0.08);
      border: 1px solid rgba(255, 248, 203, 0.15);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      color: var(--color-cream-200);

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-accent-500);
        box-shadow: 0 0 8px var(--color-accent-500);
      }
    }

    .footer-heading {
      color: var(--color-cream-200);
      font-size: 1.05rem;
      font-weight: 700;
      margin-block-end: var(--space-5);
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 24px;
        height: 2px;
        background-color: var(--color-accent-500);
        margin-block-start: var(--space-2);
      }
    }

    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      a {
        color: var(--color-primary-200);
        font-size: 0.9rem;
        transition: color 0.2s ease;

        &:hover {
          color: #FFFFFF;
          padding-inline-start: 4px;
        }
      }
    }

    .footer-contact-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary-200);
      font-size: 0.9rem;
      margin-block-end: var(--space-3);

      a {
        color: var(--color-cream-200);
        &:hover {
          text-decoration: underline;
        }
      }

      .icon {
        color: var(--color-accent-500);
      }
    }

    .footer-cta-box {
      margin-block-top: var(--space-4);
      .w-100 {
        width: 100%;
      }
    }

    .footer-tech-strip {
      background: rgba(100, 57, 81, 0.4);
      border-block: 1px solid rgba(255, 248, 203, 0.08);
      padding-block: var(--space-4);
      text-align: center;

      .tech-strip-text {
        font-size: 0.88rem;
        color: var(--color-cream-200);
        font-weight: 600;
        letter-spacing: 0.02em;
      }
    }

    .footer-bottom-bar {
      padding-block: var(--space-5);
      background-color: #140b10;
    }

    .footer-bottom-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      font-size: 0.85rem;
      color: var(--color-primary-300);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }

    .footer-meta-links {
      display: flex;
      align-items: center;
      gap: var(--space-3);

      a:hover {
        color: var(--color-cream-200);
      }
      .divider {
        color: var(--color-primary-400);
      }
    }
  `]
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  
  readonly copyrightText = computed(() => {
    return `© ${this.currentYear} Buildora. Graduation Project — ITI Intake 46 (PD & CRM Track).`;
  });
}
