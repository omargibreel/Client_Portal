import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TiltedCardDirective } from '../../../../core/directives/tilted-card.directive';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, TiltedCardDirective, ScrollRevealDirective],
  template: `
    <section class="section-wrapper services-section" id="services" aria-labelledby="services-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'services.badge' | translate }}</span>
          <h2 id="services-heading">{{ 'services.title' | translate }}</h2>
          <p>{{ 'services.subtitle' | translate }}</p>
        </div>

        <!-- 6 Core Service Cards (3x2 Bento Grid) -->
        <div class="services-grid">
          <!-- 1. Project Setup -->
          <div class="service-card buildora-card" appTiltedCard [maxTilt]="8" appScrollReveal [revealDelay]="100">
            <div class="card-icon-header">
              <div class="service-icon-box icon-setup">
                <span>📐</span>
              </div>
              <span class="module-num">01</span>
            </div>
            <h3 class="service-card-title">{{ 'services.items.setup.title' | translate }}</h3>
            <p class="service-card-desc">{{ 'services.items.setup.description' | translate }}</p>
            <div class="service-tags">
              <span>Contracts</span>
              <span>Milestones</span>
              <span>Teams</span>
            </div>
          </div>

          <!-- 2. Delivery Tracking -->
          <div class="service-card buildora-card" appTiltedCard [maxTilt]="8" appScrollReveal [revealDelay]="150">
            <div class="card-icon-header">
              <div class="service-icon-box icon-delivery">
                <span>🏗️</span>
              </div>
              <span class="module-num">02</span>
            </div>
            <h3 class="service-card-title">{{ 'services.items.delivery.title' | translate }}</h3>
            <p class="service-card-desc">{{ 'services.items.delivery.description' | translate }}</p>
            <div class="service-tags">
              <span>Chapters</span>
              <span>Progress %</span>
              <span>Risk Logs</span>
            </div>
          </div>

          <!-- 3. Finance & Cash Flow -->
          <div class="service-card buildora-card service-card-highlight" appTiltedCard [maxTilt]="8" appScrollReveal [revealDelay]="200">
            <div class="card-icon-header">
              <div class="service-icon-box icon-finance">
                <span>💰</span>
              </div>
              <span class="module-num">03</span>
            </div>
            <h3 class="service-card-title">{{ 'services.items.finance.title' | translate }}</h3>
            <p class="service-card-desc">{{ 'services.items.finance.description' | translate }}</p>
            <div class="service-tags">
              <span>Certificates</span>
              <span>Invoices</span>
              <span>Net Cash Flow</span>
            </div>
          </div>

          <!-- 4. Documents (SharePoint) -->
          <div class="service-card buildora-card" appTiltedCard [maxTilt]="8" appScrollReveal [revealDelay]="250">
            <div class="card-icon-header">
              <div class="service-icon-box icon-documents">
                <span>📁</span>
              </div>
              <span class="module-num">04</span>
            </div>
            <h3 class="service-card-title">{{ 'services.items.documents.title' | translate }}</h3>
            <p class="service-card-desc">{{ 'services.items.documents.description' | translate }}</p>
            <div class="service-tags">
              <span>SharePoint</span>
              <span>Drawings</span>
              <span>Metadata</span>
            </div>
          </div>

          <!-- 5. Real-Time Insights -->
          <div class="service-card buildora-card" appTiltedCard [maxTilt]="8" appScrollReveal [revealDelay]="300">
            <div class="card-icon-header">
              <div class="service-icon-box icon-insights">
                <span>📊</span>
              </div>
              <span class="module-num">05</span>
            </div>
            <h3 class="service-card-title">{{ 'services.items.insights.title' | translate }}</h3>
            <p class="service-card-desc">{{ 'services.items.insights.description' | translate }}</p>
            <div class="service-tags">
              <span>BI Rollups</span>
              <span>Formulas</span>
              <span>Dashboards</span>
            </div>
          </div>

          <!-- 6. Automated Alerts -->
          <div class="service-card buildora-card" appTiltedCard [maxTilt]="8" appScrollReveal [revealDelay]="350">
            <div class="card-icon-header">
              <div class="service-icon-box icon-alerts">
                <span>🔔</span>
              </div>
              <span class="module-num">06</span>
            </div>
            <h3 class="service-card-title">{{ 'services.items.alerts.title' | translate }}</h3>
            <p class="service-card-desc">{{ 'services.items.alerts.description' | translate }}</p>
            <div class="service-tags">
              <span>Automate Flows</span>
              <span>Due Dates</span>
              <span>Email Triggers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      background-color: var(--color-bg);
      position: relative;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }
    }

    .service-card {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      position: relative;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        border-color: var(--color-primary-300);
        box-shadow: 0 16px 36px rgba(100, 57, 81, 0.14);
      }

      &.service-card-highlight {
        background: linear-gradient(180deg, #FFFFFF 0%, #FFFDF3 100%);
        border-color: rgba(201, 123, 74, 0.3);
      }
    }

    .card-icon-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block-end: var(--space-6);
    }

    .service-icon-box {
      width: 54px;
      height: 54px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;

      &.icon-setup { background: #F6EEF2; }
      &.icon-delivery { background: #FAF8F7; }
      &.icon-finance { background: #FFF8CB; }
      &.icon-documents { background: #E8D3DD; }
      &.icon-insights { background: #FFF0A3; }
      &.icon-alerts { background: #F1ECEC; }
    }

    .module-num {
      font-family: var(--font-family-display);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-primary-300);
    }

    .service-card-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-primary-900);
      margin-block-end: var(--space-3);
    }

    .service-card-desc {
      font-size: 0.98rem;
      color: var(--color-neutral-700);
      line-height: 1.6;
      margin-block-end: var(--space-6);
      flex-grow: 1;
    }

    .service-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.45rem;

      span {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-primary-600);
        background: var(--color-primary-50);
        padding: 0.2rem 0.55rem;
        border-radius: var(--radius-sm);
      }
    }
  `]
})
export class ServicesSectionComponent {}
