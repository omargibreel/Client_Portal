import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-tech-stack-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="section-wrapper tech-section" id="tech" aria-labelledby="tech-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'tech.badge' | translate }}</span>
          <h2 id="tech-heading">{{ 'tech.title' | translate }}</h2>
          <p>{{ 'tech.subtitle' | translate }}</p>
        </div>

        <!-- 6 Tech Capabilities Grid -->
        <div class="tech-grid">
          <div *ngFor="let item of techItems; let i = index" class="tech-card buildora-card" appScrollReveal [revealDelay]="i * 70">
            <div class="tech-icon-box">
              <span class="icon">{{ item.icon }}</span>
            </div>
            <h3 class="tech-title">{{ 'tech.items.' + i + '.name' | translate }}</h3>
            <div class="tech-role-tag">{{ 'tech.items.' + i + '.role' | translate }}</div>
            <p class="tech-desc">{{ 'tech.items.' + i + '.desc' | translate }}</p>
          </div>
        </div>
      </div>

      <!-- Infinite Logo Marquee Strip -->
      <div class="marquee-wrapper" aria-hidden="true">
        <div class="marquee-track">
          <div class="marquee-item" *ngFor="let badge of marqueeBadges">
            <span class="marquee-icon">✦</span>
            <span>{{ badge }}</span>
          </div>
          <!-- Duplicate for continuous loop -->
          <div class="marquee-item" *ngFor="let badge of marqueeBadges">
            <span class="marquee-icon">✦</span>
            <span>{{ badge }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tech-section {
      background-color: var(--color-bg);
      position: relative;
      overflow: hidden;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);
      margin-block-end: var(--space-16);

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .tech-card {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: var(--transition-standard);

      &:hover {
        border-color: var(--color-accent-500);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    }

    .tech-icon-box {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      background: var(--color-primary-50);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-block-end: var(--space-4);
    }

    .tech-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary-900);
      margin-block-end: 0.25rem;
    }

    .tech-role-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--color-accent-500);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-block-end: var(--space-3);
    }

    .tech-desc {
      font-size: 0.92rem;
      color: var(--color-neutral-700);
      line-height: 1.55;
    }

    /* Infinite Marquee Loop */
    .marquee-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--color-primary-50);
      border-block: 1px solid var(--color-primary-100);
      padding-block: var(--space-4);
      mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    }

    .marquee-track {
      display: flex;
      width: max-content;
      animation: marqueeScroll 28s linear infinite;
    }

    :host-context([dir="rtl"]) .marquee-track,
    [dir="rtl"] .marquee-track {
      animation-name: marqueeScrollRtl;
    }

    .marquee-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding-inline: var(--space-8);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-primary-700);
      white-space: nowrap;

      .marquee-icon {
        color: var(--color-accent-500);
        font-size: 0.9rem;
      }
    }
  `]
})
export class TechStackSectionComponent {
  readonly techItems = [
    { icon: '📱' },
    { icon: '🗄️' },
    { icon: '🔄' },
    { icon: '📂' },
    { icon: '🧩' },
    { icon: '⚙️' }
  ];

  readonly marqueeBadges = [
    'Microsoft Power Apps',
    'Microsoft Dataverse',
    'Power Automate',
    'Microsoft SharePoint',
    'PCF Custom Controls',
    'C# Server Plugins',
    'Microsoft Entra ID'
  ];
}
