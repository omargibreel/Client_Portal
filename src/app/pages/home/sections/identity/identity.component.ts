import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-identity-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="section-wrapper section-alt identity-section" id="identity" aria-labelledby="identity-heading">
      <div class="container identity-container">
        <!-- Left / Lead Column -->
        <div class="identity-text-col" appScrollReveal [revealDirection]="'left'">
          <span class="section-badge">{{ 'identity.badge' | translate }}</span>
          <h2 id="identity-heading" class="identity-title">{{ 'identity.title' | translate }}</h2>
          <p class="identity-lead">{{ 'identity.lead' | translate }}</p>
          <p class="identity-paragraph">{{ 'identity.paragraph' | translate }}</p>

          <div class="identity-highlight-pill">
            <span class="shield-icon">🛡️</span>
            <span>{{ 'identity.highlight' | translate }}</span>
          </div>

          <div class="identity-feature-list">
            <div class="feature-item">
              <div class="check-bullet">✓</div>
              <p>{{ 'identity.points.boundary' | translate }}</p>
            </div>
            <div class="feature-item">
              <div class="check-bullet">✓</div>
              <p>{{ 'identity.points.record' | translate }}</p>
            </div>
            <div class="feature-item">
              <div class="check-bullet">✓</div>
              <p>{{ 'identity.points.security' | translate }}</p>
            </div>
          </div>
        </div>

        <!-- Right / Architecture Visual Card -->
        <div class="identity-visual-col" appScrollReveal [revealDirection]="'right'" [revealDelay]="200">
          <div class="arch-card">
            <div class="arch-card-header">
              <div class="tenant-badge">
                <span class="status-indicator"></span>
                <span>Tenant Environment Boundary</span>
              </div>
              <span class="arch-meta">Model-Driven App</span>
            </div>

            <div class="arch-layer-box layer-app">
              <div class="layer-title">
                <span class="layer-icon">📱</span>
                <strong>Buildora Workspace (Power Apps)</strong>
              </div>
              <p class="layer-sub">Role-tailored UI for Admins, PMs & Site Engineers</p>
            </div>

            <div class="arch-connector-line">
              <span class="flow-arrow">▼</span>
            </div>

            <div class="arch-layer-box layer-dataverse">
              <div class="layer-title">
                <span class="layer-icon">🗄️</span>
                <strong>Microsoft Dataverse (System of Record)</strong>
              </div>
              <p class="layer-sub">Relational schema: Projects · Contracts · Milestones · Certificates · Payments</p>
            </div>

            <div class="arch-connector-line">
              <span class="flow-arrow">▼</span>
            </div>

            <div class="arch-integrations-row">
              <div class="mini-card">
                <span class="mini-icon">🔄</span>
                <span>Power Automate Workflows</span>
              </div>
              <div class="mini-card">
                <span class="mini-icon">📁</span>
                <span>SharePoint Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .identity-container {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: var(--space-12);
      align-items: center;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }

    .identity-title {
      font-size: clamp(2rem, 3.5vw, 2.75rem);
      margin-block-end: var(--space-4);
    }

    .identity-lead {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-primary-800);
      margin-block-end: var(--space-4);
      line-height: 1.5;
    }

    .identity-paragraph {
      font-size: 1.05rem;
      color: var(--color-neutral-700);
      line-height: 1.7;
      margin-block-end: var(--space-6);
    }

    .identity-highlight-pill {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      background-color: var(--color-primary-50);
      border: 1px solid var(--color-primary-200);
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-4);
      font-weight: 700;
      font-size: 0.92rem;
      color: var(--color-primary-700);
      margin-block-end: var(--space-6);
    }

    .identity-feature-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);

      p {
        font-size: 0.95rem;
        color: var(--color-neutral-700);
        line-height: 1.5;
      }
    }

    .check-bullet {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: var(--color-success);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* Architecture Visual Card */
    .arch-card {
      background: #FFFFFF;
      border: 2px solid var(--color-primary-200);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      box-shadow: var(--shadow-lg);
    }

    .arch-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block-end: var(--space-5);
      border-block-end: 1px dashed var(--color-primary-100);
      padding-block-end: var(--space-3);
    }

    .tenant-badge {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-primary-600);

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-success);
        box-shadow: 0 0 6px var(--color-success);
      }
    }

    .arch-meta {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-accent-500);
    }

    .arch-layer-box {
      background: var(--color-primary-50);
      border: 1px solid var(--color-primary-200);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    .layer-title {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--color-primary-800);
      font-size: 0.95rem;
      margin-block-end: 0.25rem;
    }

    .layer-sub {
      font-size: 0.8rem;
      color: var(--color-neutral-500);
      margin-inline-start: 1.8rem;
    }

    .arch-connector-line {
      text-align: center;
      color: var(--color-primary-300);
      font-size: 0.75rem;
      padding-block: 0.25rem;
    }

    .layer-dataverse {
      background: #FFFDF3;
      border-color: rgba(201, 123, 74, 0.3);
    }

    .arch-integrations-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-3);

      .mini-card {
        background: #FAF8F7;
        border: 1px solid var(--color-neutral-300);
        border-radius: var(--radius-sm);
        padding: 0.5rem 0.65rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-primary-700);
      }
    }
  `]
})
export class IdentitySectionComponent {}
