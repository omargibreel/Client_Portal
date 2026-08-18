import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './sections/hero/hero.component';
import { ProblemSectionComponent } from './sections/problem/problem.component';
import { IdentitySectionComponent } from './sections/identity/identity.component';
import { ServicesSectionComponent } from './sections/services/services.component';
import { JourneySectionComponent } from './sections/journey/journey.component';
import { FinanceHighlightSectionComponent } from './sections/finance-highlight/finance-highlight.component';
import { TechStackSectionComponent } from './sections/tech-stack/tech-stack.component';
import { SecuritySectionComponent } from './sections/security/security.component';
import { TeamSectionComponent } from './sections/team/team.component';
import { CtaBandSectionComponent } from './sections/cta-band/cta-band.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    ProblemSectionComponent,
    IdentitySectionComponent,
    ServicesSectionComponent,
    JourneySectionComponent,
    FinanceHighlightSectionComponent,
    TechStackSectionComponent,
    SecuritySectionComponent,
    TeamSectionComponent,
    CtaBandSectionComponent
  ],
  template: `
    <main class="home-page">
      <app-hero-section></app-hero-section>
      <app-problem-section></app-problem-section>
      <app-identity-section></app-identity-section>
      <app-services-section></app-services-section>
      <app-journey-section></app-journey-section>
      <app-finance-highlight-section></app-finance-highlight-section>
      <app-tech-stack-section></app-tech-stack-section>
      <app-security-section></app-security-section>
      <app-team-section></app-team-section>
      <app-cta-band-section></app-cta-band-section>
    </main>
  `,
  styles: [`
    .home-page {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Buildora — One Connected Workspace for the Construction Lifecycle',
      description: 'Construction Project Management System built on Microsoft Power Platform (Dataverse, Power Apps, Power Automate, SharePoint). ITI Intake 46 graduation project.',
      keywords: 'Buildora, Construction CRM, Dataverse, Power Apps, Power Automate, SharePoint, ITI Intake 46'
    });
  }
}
