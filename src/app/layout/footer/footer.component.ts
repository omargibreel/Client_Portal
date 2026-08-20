import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MagneticHoverDirective } from '../../core/directives/magnetic-hover.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, MagneticHoverDirective],
  template: `
    <footer class="footer-wrapper">
      <!-- Radiant Top Accent Line -->
      <div class="footer-ambient-glow" aria-hidden="true"></div>

      <div class="container footer-container">
        <!-- Brand Column -->
        <div class="footer-col footer-brand-col">
          <a routerLink="/" class="footer-logo-link" aria-label="Buildora">
            <img src="assets/images/logo-cream.png" alt="Buildora" class="footer-logo-img">
          </a>
          <p class="footer-tagline">
            {{ 'footer.tagline' | translate }}
          </p>
        </div>

        <!-- Quick Navigation Column -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ 'footer.quickLinks' | translate }}</h4>
          <ul class="footer-links">
            <li><a routerLink="/"><span class="link-bullet">›</span>{{ 'nav.home' | translate }}</a></li>
            <li><a href="#services"><span class="link-bullet">›</span>{{ 'nav.services' | translate }}</a></li>
            <li><a href="#journey"><span class="link-bullet">›</span>{{ 'nav.journey' | translate }}</a></li>
            <li><a href="#tech"><span class="link-bullet">›</span>{{ 'nav.tech' | translate }}</a></li>
            <li><a routerLink="/contact"><span class="link-bullet">›</span>{{ 'nav.contact' | translate }}</a></li>
            <li><a href="http://localhost:4201" target="_blank" rel="noopener noreferrer"><span class="link-bullet">›</span>{{ 'nav.adminPortal' | translate }} ↗</a></li>
          </ul>
        </div>

        <!-- Direct Contact & Action Column -->
        <div class="footer-col footer-contact-col">
          <h4 class="footer-heading">{{ 'footer.contactHeading' | translate }}</h4>
          <p class="footer-contact-desc">
            {{ 'footer.consultationNote' | translate }}
          </p>

          <div class="contact-methods">
            <a href="mailto:buildoracrm@gmail.com" class="contact-chip" aria-label="Email Buildora">
              <span class="chip-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <span>buildoracrm&#64;gmail.com</span>
            </a>
          </div>

          <div class="footer-cta-box">
            <a 
              routerLink="/contact" 
              class="btn btn-primary btn-sm w-100"
              appMagneticHover
              [magneticStrength]="0.2"
            >
              {{ 'nav.cta' | translate }}
            </a>
          </div>
        </div>
      </div>

      <!-- Partner Tech Strip -->
      <div class="footer-tech-strip">
        <div class="container tech-strip-container">
          <span class="tech-strip-label">{{ 'footer.techStrip' | translate }}:</span>
          <div class="tech-badges">
            <span class="tech-pill">Microsoft Dataverse</span>
            <span class="tech-pill">Power Apps</span>
            <span class="tech-pill">Power Automate</span>
            <span class="tech-pill">SharePoint</span>
            <span class="tech-pill">Power BI</span>
          </div>
        </div>
      </div>

      <!-- Copyright Bottom Bar -->
      <div class="footer-bottom-bar">
        <div class="container footer-bottom-container">
          <p class="copyright-text">
            {{ 'footer.copyright' | translate: { year: currentYear } }}
          </p>

          <div class="footer-meta-links">
            <a routerLink="/contact">{{ 'footer.privacy' | translate }}</a>
            <span class="divider">·</span>
            <a routerLink="/contact">{{ 'footer.terms' | translate }}</a>
            <span class="divider">·</span>
            <a href="#security">{{ 'footer.security' | translate }}</a>
          </div>

          <!-- Back to Top Button -->
          <button 
            type="button" 
            class="back-to-top-btn" 
            (click)="scrollToTop()"
            [attr.aria-label]="'footer.backToTop' | translate"
            title="{{ 'footer.backToTop' | translate }}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            <span>{{ 'footer.backToTop' | translate }}</span>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background-color: var(--color-footer-bg);
      color: var(--color-cream-100);
      padding-block-start: var(--space-16);
      position: relative;
      overflow: hidden;
      border-block-start: 1px solid rgba(255, 248, 203, 0.1);
    }

    .footer-ambient-glow {
      position: absolute;
      top: 0;
      inset-inline: 0;
      height: 1px;
      background: linear-gradient(
        90deg, 
        transparent 0%, 
        var(--color-accent-500) 25%, 
        var(--color-cream-200) 50%, 
        var(--color-accent-500) 75%, 
        transparent 100%
      );
      box-shadow: 0 0 16px rgba(201, 123, 74, 0.6);
    }

    .footer-container {
      display: grid;
      grid-template-columns: 2fr 1fr 1.4fr;
      gap: var(--space-10);
      padding-block-end: var(--space-12);

      @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }

    .footer-logo-link {
      display: inline-block;
      margin-block-end: var(--space-4);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.03);
      }
    }

    .footer-logo-img {
      height: 42px;
      width: auto;
      display: block;
    }

    .footer-tagline {
      color: var(--color-primary-200);
      font-size: 0.95rem;
      max-width: 360px;
      line-height: 1.65;
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
        background: linear-gradient(90deg, var(--color-accent-500), transparent);
        margin-block-start: var(--space-2);
        border-radius: var(--radius-full);
      }
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);

      a {
        color: var(--color-primary-200);
        font-size: 0.92rem;
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

        .link-bullet {
          color: var(--color-accent-500);
          font-weight: 700;
          opacity: 0.6;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        &:hover {
          color: #FFFFFF;
          transform: translateX(4px);

          .link-bullet {
            opacity: 1;
            transform: translateX(2px);
          }
        }
      }
    }

    /* Contact Column & Chips */
    .footer-contact-desc {
      color: var(--color-primary-200);
      font-size: 0.9rem;
      margin-block-end: var(--space-4);
      line-height: 1.5;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin-block-end: var(--space-4);
    }

    .contact-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      padding: 0.5rem 0.85rem;
      background: rgba(255, 248, 203, 0.04);
      border: 1px solid rgba(255, 248, 203, 0.09);
      border-radius: var(--radius-md);
      color: var(--color-cream-100);
      font-size: 0.88rem;
      text-decoration: none;
      transition: all 0.2s ease;

      .chip-icon {
        color: var(--color-accent-500);
        display: flex;
        align-items: center;
      }

      &:hover {
        background: rgba(255, 248, 203, 0.08);
        border-color: rgba(201, 123, 74, 0.4);
        color: #FFFFFF;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      }
    }

    .footer-cta-box {
      margin-block-top: var(--space-3);
      .w-100 {
        width: 100%;
      }
    }

    /* Partner Tech Strip */
    .footer-tech-strip {
      background: rgba(34, 18, 28, 0.6);
      border-block: 1px solid rgba(255, 248, 203, 0.06);
      padding-block: var(--space-4);
    }

    .tech-strip-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--space-3) var(--space-4);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }

    .tech-strip-label {
      font-size: 0.86rem;
      color: var(--color-cream-200);
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.9;
    }

    .tech-badges {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-2);
      justify-content: center;
    }

    .tech-pill {
      font-size: 0.78rem;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-full);
      background: rgba(255, 248, 203, 0.07);
      border: 1px solid rgba(255, 248, 203, 0.12);
      color: var(--color-cream-100);
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(201, 123, 74, 0.2);
        border-color: var(--color-accent-500);
        color: #FFFFFF;
      }
    }

    /* Copyright & Bottom Bar */
    .footer-bottom-bar {
      padding-block: var(--space-5);
      background-color: #12090e;
    }

    .footer-bottom-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      font-size: 0.85rem;
      color: var(--color-primary-300);

      @media (max-width: 850px) {
        flex-direction: column;
        text-align: center;
        gap: var(--space-3);
      }
    }

    .copyright-text {
      color: var(--color-primary-200);
      font-size: 0.85rem;
    }

    .footer-meta-links {
      display: flex;
      align-items: center;
      gap: var(--space-3);

      a {
        color: var(--color-primary-200);
        transition: color 0.2s ease;

        &:hover {
          color: var(--color-cream-200);
          text-decoration: underline;
        }
      }

      .divider {
        color: var(--color-primary-400);
      }
    }

    .back-to-top-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      background: rgba(255, 248, 203, 0.06);
      border: 1px solid rgba(255, 248, 203, 0.12);
      color: var(--color-cream-200);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background: var(--color-accent-500);
        border-color: var(--color-accent-500);
        color: #FFFFFF;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(201, 123, 74, 0.35);
      }
    }
  `]
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
