import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-security-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="section-wrapper section-alt security-section" id="security" aria-labelledby="security-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'security.badge' | translate }}</span>
          <h2 id="security-heading">{{ 'security.title' | translate }}</h2>
          <p>{{ 'security.subtitle' | translate }}</p>
        </div>

        <!-- 3 Role Governance Cards -->
        <div class="security-roles-grid">
          <!-- Role 1: Admin -->
          <div class="role-card buildora-card" appScrollReveal [revealDelay]="100">
            <div class="role-badge-row">
              <span class="role-icon">🛡️</span>
              <span class="role-tag">{{ 'security.roles.admin.tag' | translate }}</span>
            </div>
            <h3 class="role-title">{{ 'security.roles.admin.title' | translate }}</h3>
            <p class="role-desc">{{ 'security.roles.admin.description' | translate }}</p>
            <ul class="role-permissions">
              <li>Tenant & Environment Settings</li>
              <li>Global Financial Rollups</li>
              <li>Security Roles & User Provisioning</li>
            </ul>
          </div>

          <!-- Role 2: Project Manager -->
          <div class="role-card buildora-card role-card-pm" appScrollReveal [revealDelay]="200">
            <div class="role-badge-row">
              <span class="role-icon">📋</span>
              <span class="role-tag">{{ 'security.roles.pm.tag' | translate }}</span>
            </div>
            <h3 class="role-title">{{ 'security.roles.pm.title' | translate }}</h3>
            <p class="role-desc">{{ 'security.roles.pm.description' | translate }}</p>
            <ul class="role-permissions">
              <li>Milestone & Chapter Scheduling</li>
              <li>Payment Certificate Approvals</li>
              <li>Risk Matrix & Mitigation Actions</li>
            </ul>
          </div>

          <!-- Role 3: Site Engineer -->
          <div class="role-card buildora-card" appScrollReveal [revealDelay]="300">
            <div class="role-badge-row">
              <span class="role-icon">👷</span>
              <span class="role-tag">{{ 'security.roles.engineer.tag' | translate }}</span>
            </div>
            <h3 class="role-title">{{ 'security.roles.engineer.title' | translate }}</h3>
            <p class="role-desc">{{ 'security.roles.engineer.description' | translate }}</p>
            <ul class="role-permissions">
              <li>Daily Progress & Physical % Logs</li>
              <li>Site Photos & Snagging Submissions</li>
              <li>Field Hazard & Incident Reports</li>
            </ul>
          </div>
        </div>

        <!-- Security Caption Callout -->
        <div class="security-footer-banner" appScrollReveal [revealDelay]="400">
          <div class="lock-icon">🔒</div>
          <p>{{ 'security.caption' | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .security-roles-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);
      margin-block-end: var(--space-12);

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
      }
    }

    .role-card {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      transition: var(--transition-standard);

      &:hover {
        border-color: var(--color-primary-300);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      &.role-card-pm {
        border-color: var(--color-primary-200);
        box-shadow: var(--shadow-md);
      }
    }

    .role-badge-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block-end: var(--space-4);
    }

    .role-icon {
      font-size: 2rem;
    }

    .role-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-accent-500);
      background: var(--color-primary-50);
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-sm);
    }

    .role-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-primary-900);
      margin-block-end: var(--space-2);
    }

    .role-desc {
      font-size: 0.95rem;
      color: var(--color-neutral-700);
      line-height: 1.6;
      margin-block-end: var(--space-6);
    }

    .role-permissions {
      list-style: none;
      border-block-start: 1px dashed var(--color-primary-100);
      padding-block-start: var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin-top: auto;

      li {
        font-size: 0.85rem;
        color: var(--color-primary-800);
        position: relative;
        padding-inline-start: var(--space-4);

        &::before {
          content: '•';
          position: absolute;
          inset-inline-start: 0;
          color: var(--color-accent-500);
          font-weight: 800;
        }
      }
    }

    .security-footer-banner {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-200);
      border-radius: var(--radius-xl);
      padding: var(--space-5) var(--space-8);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      text-align: center;
      max-width: 820px;
      margin-inline: auto;
      box-shadow: var(--shadow-sm);

      .lock-icon {
        font-size: 1.5rem;
      }

      p {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--color-primary-800);
      }
    }
  `]
})
export class SecuritySectionComponent {}
