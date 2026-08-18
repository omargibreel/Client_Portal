import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  template: `
    <section class="section-wrapper team-section" id="team" aria-labelledby="team-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header" appScrollReveal>
          <span class="section-badge">{{ 'team.badge' | translate }}</span>
          <h2 id="team-heading">{{ 'team.title' | translate }}</h2>
          <p>{{ 'team.subtitle' | translate }}</p>
        </div>

        <!-- 6 Team Member Cards Grid -->
        <div class="team-grid">
          <div 
            *ngFor="let member of teamMembers; let i = index" 
            class="team-card buildora-card"
            [class.lead-card]="i === 0"
            appScrollReveal
            [revealDelay]="i * 70"
          >
            <!-- Member Avatar / Initials Bubble -->
            <div class="avatar-bubble" [class.lead-avatar]="i === 0">
              <span>{{ member.initials }}</span>
            </div>

            <!-- Member Info -->
            <h3 class="member-name">{{ 'team.members.' + i + '.name' | translate }}</h3>
            <p class="member-role">{{ 'team.members.' + i + '.role' | translate }}</p>

            <div class="member-badge" *ngIf="i === 0">
              <span>★ Technical Lead</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .team-section {
      background-color: var(--color-bg);
      position: relative;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .team-card {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: var(--transition-standard);
      position: relative;

      &:hover {
        border-color: var(--color-accent-500);
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
      }

      &.lead-card {
        border-color: var(--color-primary-300);
        background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F7 100%);
      }
    }

    .avatar-bubble {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--color-primary-500);
      color: var(--color-cream-200);
      font-family: var(--font-family-display);
      font-size: 1.4rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-block-end: var(--space-4);
      box-shadow: 0 4px 14px rgba(100, 57, 81, 0.25);
      transition: transform 0.3s ease;

      &.lead-avatar {
        background: linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-primary-500) 100%);
        color: #FFFFFF;
        box-shadow: 0 6px 18px rgba(201, 123, 74, 0.4);
      }
    }

    .team-card:hover .avatar-bubble {
      transform: scale(1.08);
    }

    .member-name {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-primary-900);
      margin-block-end: 0.25rem;
    }

    .member-role {
      font-size: 0.88rem;
      color: var(--color-neutral-500);
      line-height: 1.5;
    }

    .member-badge {
      margin-block-start: var(--space-3);
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.6rem;
      background-color: var(--color-primary-50);
      color: var(--color-primary-600);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
    }
  `]
})
export class TeamSectionComponent {
  readonly teamMembers = [
    { initials: 'OG' },
    { initials: 'YK' },
    { initials: 'BS' },
    { initials: 'RR' },
    { initials: 'SM' },
    { initials: 'AF' }
  ];
}
