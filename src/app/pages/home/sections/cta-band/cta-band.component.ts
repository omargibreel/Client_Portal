import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MagneticHoverDirective } from '../../../../core/directives/magnetic-hover.directive';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-cta-band-section',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, MagneticHoverDirective, ScrollRevealDirective],
  template: `
    <section class="cta-band-wrapper" aria-labelledby="cta-band-heading">
      <!-- Glow & Blueprint Background Accent -->
      <div class="cta-bg-glow"></div>

      <div class="container cta-band-container" appScrollReveal>
        <h2 id="cta-band-heading" class="cta-band-title">
          {{ 'ctaBand.title' | translate }}
        </h2>
        <p class="cta-band-subtitle">
          {{ 'ctaBand.subtitle' | translate }}
        </p>

        <div class="cta-band-actions">
          <a 
            routerLink="/contact" 
            class="btn btn-cream btn-lg btn-shiny"
            appMagneticHover
            [magneticStrength]="0.3"
          >
            {{ 'ctaBand.button' | translate }}
            <span class="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-band-wrapper {
      position: relative;
      background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-800) 100%);
      color: var(--color-cream-100);
      padding-block: var(--space-20);
      overflow: hidden;
      text-align: center;
      border-block-start: 1px solid rgba(255, 248, 203, 0.15);
    }

    .cta-bg-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(201, 123, 74, 0.25) 0%, transparent 70%);
      pointer-events: none;
    }

    .cta-band-container {
      position: relative;
      z-index: 1;
      max-width: 840px;
    }

    .cta-band-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: var(--color-cream-200);
      line-height: 1.2;
      margin-block-end: var(--space-4);
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    }

    .cta-band-subtitle {
      font-size: 1.2rem;
      color: var(--color-primary-100);
      margin-block-end: var(--space-8);
      max-width: 640px;
      margin-inline: auto;
    }

    .cta-band-actions {
      display: flex;
      justify-content: center;

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
  `]
})
export class CtaBandSectionComponent {}
