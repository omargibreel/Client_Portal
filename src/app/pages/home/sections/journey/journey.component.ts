import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-journey-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="section-wrapper section-alt journey-section" id="journey" aria-labelledby="journey-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'journey.badge' | translate }}</span>
          <h2 id="journey-heading">{{ 'journey.title' | translate }}</h2>
          <p>{{ 'journey.subtitle' | translate }}</p>
        </div>

        <!-- 8-Step Timeline Grid -->
        <div class="journey-grid">
          <div 
            *ngFor="let step of steps; let i = index" 
            class="journey-step-card"
            appScrollReveal
            [revealDelay]="i * 75"
          >
            <div class="step-header">
              <span class="step-badge">{{ step.num }}</span>
              <div class="step-connector" *ngIf="i < steps.length - 1" aria-hidden="true"></div>
            </div>
            <h3 class="step-title">{{ 'journey.steps.' + i + '.title' | translate }}</h3>
            <p class="step-desc">{{ 'journey.steps.' + i + '.desc' | translate }}</p>
          </div>
        </div>

        <!-- Automation Caption Callout -->
        <div class="journey-caption-banner" appScrollReveal [revealDelay]="400">
          <div class="banner-sparkle">⚡</div>
          <p>{{ 'journey.caption' | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .journey-section {
      position: relative;
    }

    .journey-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);
      margin-block-end: var(--space-12);

      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .journey-step-card {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      position: relative;
      transition: var(--transition-standard);
      display: flex;
      flex-direction: column;

      &:hover {
        border-color: var(--color-primary-300);
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }
    }

    .step-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block-end: var(--space-4);
    }

    .step-badge {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-md);
      background: var(--color-primary-500);
      color: var(--color-cream-200);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-family-display);
      font-size: 1.15rem;
      font-weight: 800;
    }

    .step-connector {
      flex-grow: 1;
      height: 2px;
      background: linear-gradient(90deg, var(--color-primary-300), var(--color-cream-300));
      margin-inline-start: var(--space-3);
      opacity: 0.6;
    }

    .step-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-primary-900);
      margin-block-end: var(--space-2);
    }

    .step-desc {
      font-size: 0.88rem;
      color: var(--color-neutral-700);
      line-height: 1.55;
    }

    .journey-caption-banner {
      background: #FFFFFF;
      border: 2px dashed var(--color-primary-200);
      border-radius: var(--radius-xl);
      padding: var(--space-5) var(--space-8);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      text-align: center;
      max-width: 800px;
      margin-inline: auto;

      .banner-sparkle {
        font-size: 1.6rem;
      }

      p {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--color-primary-800);
      }
    }
  `]
})
export class JourneySectionComponent {
  readonly steps = [
    { num: '01' },
    { num: '02' },
    { num: '03' },
    { num: '04' },
    { num: '05' },
    { num: '06' },
    { num: '07' },
    { num: '08' }
  ];
}
