import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BrandRevealTextComponent } from '../../../../shared/components/brand-reveal-text/brand-reveal-text.component';
import { HeroAuroraBackgroundComponent } from '../../../../shared/components/hero-aurora-bg/hero-aurora-bg.component';
import { MagneticHoverDirective } from '../../../../core/directives/magnetic-hover.directive';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    BrandRevealTextComponent,
    HeroAuroraBackgroundComponent,
    MagneticHoverDirective,
    ScrollRevealDirective
  ],
  template: `
    <section class="hero-wrapper" aria-labelledby="hero-headline">
      <app-hero-aurora-bg></app-hero-aurora-bg>

      <div class="container hero-content">
        <!-- Badge row -->
        <div class="hero-badge-pill" appScrollReveal [revealDelay]="100">
          <span class="pulse-dot"></span>
          <span>{{ 'hero.tags' | translate }}</span>
        </div>

        <!-- Main Brand Title Reveal -->
        <h1 id="hero-headline" class="hero-title">
          <app-brand-reveal-text [text]="'hero.title' | translate"></app-brand-reveal-text>
        </h1>

        <!-- Subheadline -->
        <p class="hero-subtitle" appScrollReveal [revealDelay]="200">
          {{ 'hero.subtitle' | translate }}
        </p>

        <!-- Supporting Tagline -->
        <p class="hero-tagline" appScrollReveal [revealDelay]="300">
          {{ 'hero.tagline' | translate }}
        </p>

        <!-- Action CTAs -->
        <div class="hero-ctas" appScrollReveal [revealDelay]="400">
          <a 
            routerLink="/contact" 
            class="btn btn-primary btn-lg btn-shiny"
            appMagneticHover
            [magneticStrength]="0.25"
          >
            {{ 'hero.ctaPrimary' | translate }}
            <span class="arrow" aria-hidden="true">→</span>
          </a>

          <a 
            href="#services" 
            class="btn btn-secondary btn-lg"
            appMagneticHover
            [magneticStrength]="0.15"
          >
            {{ 'hero.ctaSecondary' | translate }}
          </a>
        </div>

        <!-- Tech Stack Pill Row -->
        <div class="hero-tech-strip" appScrollReveal [revealDelay]="500">
          <div class="tech-item">
            <span class="tech-icon">⚡</span>
            <span>Dataverse</span>
          </div>
          <div class="tech-divider">·</div>
          <div class="tech-item">
            <span class="tech-icon">📱</span>
            <span>Power Apps</span>
          </div>
          <div class="tech-divider">·</div>
          <div class="tech-item">
            <span class="tech-icon">🔄</span>
            <span>Power Automate</span>
          </div>
          <div class="tech-divider">·</div>
          <div class="tech-item">
            <span class="tech-icon">📂</span>
            <span>SharePoint</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-wrapper {
      position: relative;
      min-height: 88vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-block: var(--space-20);
      overflow: hidden;
      background: linear-gradient(180deg, #FAF8F7 0%, #FFFDF3 100%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 900px;
    }

    .hero-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      background: rgba(100, 57, 81, 0.08);
      border: 1px solid var(--color-primary-200);
      padding: 0.4rem 1.1rem;
      border-radius: var(--radius-full);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--color-primary-600);
      margin-block-end: var(--space-6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-accent-500);
        box-shadow: 0 0 10px var(--color-accent-500);
      }
    }

    .hero-title {
      font-size: clamp(3.2rem, 7.5vw, 5.8rem);
      font-weight: 900;
      color: var(--color-primary-500);
      letter-spacing: -0.04em;
      line-height: 1.05;
      margin-block-end: var(--space-4);
      text-shadow: 0 2px 20px rgba(100, 57, 81, 0.08);
    }

    .hero-subtitle {
      font-size: clamp(1.35rem, 2.8vw, 1.85rem);
      font-weight: 700;
      color: var(--color-primary-700);
      margin-block-end: var(--space-3);
      max-width: 760px;
    }

    .hero-tagline {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--color-neutral-700);
      line-height: 1.6;
      max-width: 680px;
      margin-block-end: var(--space-10);
    }

    .hero-ctas {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      flex-wrap: wrap;
      margin-block-end: var(--space-12);

      .arrow {
        display: inline-block;
        transition: transform 0.2s ease;
      }

      &:hover .arrow {
        transform: translateX(4px);
      }

      [dir="rtl"] & .arrow {
        transform: scaleX(-1);
      }
      [dir="rtl"] &:hover .arrow {
        transform: scaleX(-1) translateX(4px);
      }
    }

    .hero-tech-strip {
      display: inline-flex;
      align-items: center;
      gap: var(--space-4);
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(100, 57, 81, 0.12);
      border-radius: var(--radius-full);
      padding: 0.6rem 1.4rem;
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      @media (max-width: 600px) {
        flex-wrap: wrap;
        border-radius: var(--radius-md);
        justify-content: center;
      }

      .tech-item {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-primary-800);
      }

      .tech-divider {
        color: var(--color-primary-300);
        font-weight: 800;
      }
    }
  `]
})
export class HeroSectionComponent {}
