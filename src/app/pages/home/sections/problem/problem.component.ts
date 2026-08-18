import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SpotlightDirective } from '../../../../core/directives/spotlight.directive';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpotlightDirective, ScrollRevealDirective],
  template: `
    <section class="section-wrapper problem-section" id="problem" aria-labelledby="problem-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'problem.badge' | translate }}</span>
          <h2 id="problem-heading">{{ 'problem.title' | translate }}</h2>
          <p>{{ 'problem.subtitle' | translate }}</p>
        </div>

        <!-- 3 Problem Spotlight Cards -->
        <div class="problem-grid">
          <!-- Card 1: Scattered Info -->
          <div class="problem-card buildora-card" appSpotlight appScrollReveal [revealDelay]="100">
            <div class="card-glow" aria-hidden="true"></div>
            <div class="icon-bubble icon-scattered">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <path d="M10 7h4"></path>
                <path d="M7 10v4"></path>
              </svg>
            </div>
            <h3 class="problem-card-title">{{ 'problem.cards.scattered.title' | translate }}</h3>
            <p class="problem-card-desc">{{ 'problem.cards.scattered.description' | translate }}</p>
            <div class="pain-tag">Fragmented Data</div>
          </div>

          <!-- Card 2: Weak Visibility -->
          <div class="problem-card buildora-card" appSpotlight appScrollReveal [revealDelay]="200">
            <div class="card-glow" aria-hidden="true"></div>
            <div class="icon-bubble icon-visibility">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </div>
            <h3 class="problem-card-title">{{ 'problem.cards.visibility.title' | translate }}</h3>
            <p class="problem-card-desc">{{ 'problem.cards.visibility.description' | translate }}</p>
            <div class="pain-tag">Blind Spots</div>
          </div>

          <!-- Card 3: Manual Follow-up -->
          <div class="problem-card buildora-card" appSpotlight appScrollReveal [revealDelay]="300">
            <div class="card-glow" aria-hidden="true"></div>
            <div class="icon-bubble icon-followup">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
                <path d="M18 6L6 18"></path>
              </svg>
            </div>
            <h3 class="problem-card-title">{{ 'problem.cards.followup.title' | translate }}</h3>
            <p class="problem-card-desc">{{ 'problem.cards.followup.description' | translate }}</p>
            <div class="pain-tag">Missed Milestones</div>
          </div>
        </div>

        <!-- Goal / Closing Statement Callout Banner -->
        <div class="goal-statement-card" appScrollReveal [revealDelay]="400">
          <div class="goal-icon">💡</div>
          <div class="goal-text">
            <p>{{ 'problem.closing' | translate }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .problem-section {
      background-color: var(--color-bg);
      position: relative;
    }

    .problem-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);
      margin-block-end: var(--space-12);

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
      }
    }

    .problem-card {
      position: relative;
      background-color: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: var(--transition-standard);
      overflow: hidden;

      &:hover {
        border-color: var(--color-primary-300);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      /* Spotlight Glow pseudo overlay */
      .card-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: var(--spotlight-opacity, 0);
        background: radial-gradient(
          350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
          rgba(255, 248, 203, 0.45) 0%,
          rgba(100, 57, 81, 0.05) 50%,
          transparent 80%
        );
        transition: opacity 0.3s ease;
      }
    }

    .icon-bubble {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-block-end: var(--space-5);
      position: relative;
      z-index: 1;

      &.icon-scattered {
        background-color: #F6EEF2;
        color: var(--color-primary-500);
      }

      &.icon-visibility {
        background-color: #FFFDF3;
        color: var(--color-accent-500);
        border: 1px solid rgba(201, 123, 74, 0.2);
      }

      &.icon-followup {
        background-color: #FAF8F7;
        color: var(--color-primary-600);
        border: 1px solid var(--color-primary-100);
      }
    }

    .problem-card-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-primary-900);
      margin-block-end: var(--space-3);
      position: relative;
      z-index: 1;
    }

    .problem-card-desc {
      font-size: 1rem;
      color: var(--color-neutral-700);
      line-height: 1.65;
      margin-block-end: var(--space-6);
      flex-grow: 1;
      position: relative;
      z-index: 1;
    }

    .pain-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-primary-400);
      background-color: var(--color-primary-50);
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-sm);
      position: relative;
      z-index: 1;
    }

    .goal-statement-card {
      background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%);
      color: var(--color-cream-100);
      border-radius: var(--radius-xl);
      padding: var(--space-8) var(--space-10);
      display: flex;
      align-items: center;
      gap: var(--space-6);
      box-shadow: var(--shadow-lg);
      border: 1px solid rgba(255, 248, 203, 0.2);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        padding: var(--space-6);
      }

      .goal-icon {
        font-size: 2.4rem;
        flex-shrink: 0;
      }

      .goal-text p {
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.6;
        color: var(--color-cream-100);
      }
    }
  `]
})
export class ProblemSectionComponent {}
