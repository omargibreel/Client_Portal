import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CountUpDirective } from '../../../../core/directives/count-up.directive';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-finance-highlight-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, CountUpDirective, ScrollRevealDirective],
  template: `
    <section class="section-wrapper section-plum finance-section" id="finance" aria-labelledby="finance-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'finance.badge' | translate }}</span>
          <h2 id="finance-heading">{{ 'finance.title' | translate }}</h2>
          <p>{{ 'finance.subtitle' | translate }}</p>
        </div>

        <!-- 4-Step Financial Chain Visual Flow -->
        <div class="finance-chain-grid">
          <div class="chain-node" appScrollReveal [revealDelay]="100">
            <div class="node-badge">1</div>
            <div class="node-icon">🏁</div>
            <h3 class="node-title">{{ 'finance.chain.0.label' | translate }}</h3>
            <p class="node-sub">{{ 'finance.chain.0.desc' | translate }}</p>
          </div>

          <div class="chain-arrow" aria-hidden="true">➔</div>

          <div class="chain-node" appScrollReveal [revealDelay]="200">
            <div class="node-badge">2</div>
            <div class="node-icon">📜</div>
            <h3 class="node-title">{{ 'finance.chain.1.label' | translate }}</h3>
            <p class="node-sub">{{ 'finance.chain.1.desc' | translate }}</p>
          </div>

          <div class="chain-arrow" aria-hidden="true">➔</div>

          <div class="chain-node" appScrollReveal [revealDelay]="300">
            <div class="node-badge">3</div>
            <div class="node-icon">🧾</div>
            <h3 class="node-title">{{ 'finance.chain.2.label' | translate }}</h3>
            <p class="node-sub">{{ 'finance.chain.2.desc' | translate }}</p>
          </div>

          <div class="chain-arrow" aria-hidden="true">➔</div>

          <div class="chain-node chain-node-highlight" appScrollReveal [revealDelay]="400">
            <div class="node-badge node-badge-accent">4</div>
            <div class="node-icon">💵</div>
            <h3 class="node-title">{{ 'finance.chain.3.label' | translate }}</h3>
            <p class="node-sub">{{ 'finance.chain.3.desc' | translate }}</p>
          </div>
        </div>

        <!-- Live Net Cash Position Metric Box with CountUp -->
        <div class="net-cash-card" appScrollReveal [revealDelay]="500">
          <div class="cash-card-left">
            <div class="formula-pill">
              <span class="pulse-indicator"></span>
              <span>{{ 'finance.formulaLabel' | translate }}</span>
            </div>
            <h3 class="formula-text">{{ 'finance.formula' | translate }}</h3>
            <p class="formula-desc">{{ 'finance.metricSub' | translate }}</p>
          </div>

          <div class="cash-card-right">
            <div class="metric-label">{{ 'finance.metricTitle' | translate }}</div>
            <div 
              class="metric-number font-display"
              appCountUp
              [countTo]="1640000"
              [countFrom]="0"
              [prefix]="'+$'"
              [duration]="2400"
            >
              +$1,640,000
            </div>
            <div class="metric-breakdown">
              <span class="breakdown-item collected">In: $4.85M</span>
              <span class="breakdown-divider">|</span>
              <span class="breakdown-item outgoing">Out: $3.21M</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .finance-section {
      background: radial-gradient(circle at 50% 0%, #643951 0%, #402434 100%);
      color: var(--color-cream-100);
      position: relative;
    }

    .finance-chain-grid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      margin-block-end: var(--space-16);

      @media (max-width: 900px) {
        flex-direction: column;
      }
    }

    .chain-node {
      background: rgba(255, 248, 203, 0.08);
      border: 1px solid rgba(255, 248, 203, 0.2);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      flex: 1;
      text-align: center;
      position: relative;
      transition: var(--transition-standard);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 248, 203, 0.14);
        transform: translateY(-4px);
      }

      &.chain-node-highlight {
        background: rgba(201, 123, 74, 0.2);
        border-color: var(--color-accent-500);
      }

      @media (max-width: 900px) {
        width: 100%;
      }
    }

    .node-badge {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--color-cream-200);
      color: var(--color-primary-900);
      font-weight: 800;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-inline: auto;
      margin-block-end: var(--space-3);

      &.node-badge-accent {
        background: var(--color-accent-500);
        color: #FFFFFF;
      }
    }

    .node-icon {
      font-size: 2rem;
      margin-block-end: var(--space-2);
    }

    .node-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-cream-200);
      margin-block-end: 0.25rem;
    }

    .node-sub {
      font-size: 0.82rem;
      color: var(--color-primary-200);
    }

    .chain-arrow {
      font-size: 1.6rem;
      color: var(--color-cream-300);
      opacity: 0.7;

      [dir="rtl"] & {
        transform: scaleX(-1);
      }

      @media (max-width: 900px) {
        transform: rotate(90deg);
        [dir="rtl"] & { transform: rotate(90deg); }
      }
    }

    /* Net Cash Card */
    .net-cash-card {
      background: rgba(28, 16, 23, 0.7);
      border: 2px solid rgba(255, 248, 203, 0.25);
      border-radius: var(--radius-xl);
      padding: var(--space-8) var(--space-12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-8);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);

      @media (max-width: 800px) {
        flex-direction: column;
        text-align: center;
        padding: var(--space-6);
      }
    }

    .formula-pill {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      background: rgba(201, 123, 74, 0.25);
      border: 1px solid var(--color-accent-500);
      border-radius: var(--radius-full);
      padding: 0.3rem 0.85rem;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--color-cream-200);
      margin-block-end: var(--space-3);

      .pulse-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-success);
        box-shadow: 0 0 8px var(--color-success);
      }
    }

    .formula-text {
      font-size: clamp(1.2rem, 2.5vw, 1.6rem);
      font-weight: 700;
      color: var(--color-cream-100);
      margin-block-end: var(--space-2);
    }

    .formula-desc {
      font-size: 0.95rem;
      color: var(--color-primary-200);
    }

    .cash-card-right {
      text-align: end;
      flex-shrink: 0;

      @media (max-width: 800px) {
        text-align: center;
      }
    }

    .metric-label {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-cream-300);
      margin-block-end: 0.25rem;
    }

    .metric-number {
      font-size: clamp(2.4rem, 4.5vw, 3.4rem);
      font-weight: 900;
      color: var(--color-cream-200);
      line-height: 1;
      margin-block-end: var(--space-2);
      text-shadow: 0 0 25px rgba(255, 248, 203, 0.4);
    }

    .metric-breakdown {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--space-3);
      font-size: 0.85rem;

      @media (max-width: 800px) {
        justify-content: center;
      }

      .collected { color: #8DE0A6; }
      .outgoing { color: #FFA9A5; }
      .breakdown-divider { color: rgba(255, 248, 203, 0.3); }
    }
  `]
})
export class FinanceHighlightSectionComponent {}
