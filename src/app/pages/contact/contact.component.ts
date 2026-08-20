import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { SeoService } from "../../core/services/seo.service";
import { ScrollRevealDirective } from "../../core/directives/scroll-reveal.directive";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ContactFormComponent,
    ScrollRevealDirective,
  ],
  template: `
    <main class="contact-page-wrapper">
      <div class="container contact-container">
        <!-- Page Header -->
        <header class="contact-header" appScrollReveal>
          <span class="section-badge">{{ "nav.cta" | translate }}</span>
          <h1 class="contact-title">{{ "contactPage.title" | translate }}</h1>
          <p class="contact-subtitle">
            {{ "contactPage.subtitle" | translate }}
          </p>
        </header>

        <!-- Main Layout: Form (Left/Main) + Sidebar (Right) -->
        <div class="contact-layout">
          <!-- Form Section -->
          <div class="contact-form-column" appScrollReveal [revealDelay]="100">
            <app-contact-form></app-contact-form>
          </div>

          <!-- Direct Contact Sidebar -->
          <aside
            class="contact-sidebar-column"
            appScrollReveal
            [revealDelay]="200"
            aria-label="Direct Contact Information"
          >
            <div class="sidebar-card buildora-card">
              <h2 class="sidebar-title">
                {{ "contactPage.sidebar.title" | translate }}
              </h2>
              <p class="sidebar-desc">
                {{ "contactPage.sidebar.subtitle" | translate }}
              </p>

              <div class="direct-contact-list">
                <div class="contact-entry">
                  <div class="entry-icon">✉</div>
                  <div class="entry-text">
                    <span class="entry-label">Email</span>
                    <a
                      [href]="
                        'mailto:' + ('contactPage.sidebar.email' | translate)
                      "
                      class="entry-val"
                    >
                      {{ "contactPage.sidebar.email" | translate }}
                    </a>
                  </div>
                </div>

                <div class="contact-entry">
                  <div class="entry-icon">📍</div>
                  <div class="entry-text">
                    <span class="entry-label">HQ Location</span>
                    <span class="entry-val">{{
                      "contactPage.sidebar.location" | translate
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="response-time-pill">
                <span class="pulse-dot"></span>
                <span>{{
                  "contactPage.sidebar.responseNote" | translate
                }}</span>
              </div>
            </div>

            <!-- Trust Badge Card -->
            <div class="trust-badge-card buildora-card mt-6">
              <div class="trust-icon">🛡️</div>
              <h3 class="trust-title">Microsoft Power Platform Tenant</h3>
              <p class="trust-desc">
                Your company workspace is provisioned inside a dedicated
                Dataverse environment with Microsoft Entra ID isolation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .contact-page-wrapper {
        padding-block: var(--space-16) var(--space-24);
        background: linear-gradient(180deg, #faf8f7 0%, #ffffff 100%);
        min-height: 90vh;

        @media (max-width: 768px) {
          padding-block: var(--space-10) var(--space-14);
        }
      }

      .contact-container {
        @media (max-width: 768px) {
          padding-block-end: var(--space-6);
        }
      }

      .contact-header {
        text-align: center;
        max-width: 780px;
        margin-inline: auto;
        margin-block-end: var(--space-12);

        @media (max-width: 768px) {
          padding-block-start: var(--space-4);
          margin-block-end: var(--space-8);
        }
      }

      .contact-title {
        font-size: clamp(2.4rem, 4.5vw, 3.4rem);
        color: var(--color-primary-500);
        margin-block: var(--space-3) var(--space-4);
      }

      .contact-subtitle {
        font-size: 1.15rem;
        color: var(--color-neutral-700);
        line-height: 1.6;

        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }

      .contact-form-column,
      .contact-sidebar-column {
        min-width: 0;
      }

      .contact-layout {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: var(--space-10);
        align-items: flex-start;

        @media (max-width: 992px) {
          grid-template-columns: 1fr;
        }
      }

      .sidebar-card {
        background: #ffffff;
        border: 1px solid var(--color-primary-100);
        border-radius: var(--radius-xl);
        padding: var(--space-8);
        box-shadow: var(--shadow-md);

        @media (max-width: 480px) {
          padding: var(--space-5);
        }
      }

      .sidebar-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--color-primary-900);
        margin-block-end: var(--space-2);
      }

      .sidebar-desc {
        font-size: 0.95rem;
        color: var(--color-neutral-700);
        line-height: 1.55;
        margin-block-end: var(--space-6);
      }

      .direct-contact-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-block-end: var(--space-6);
      }

      .contact-entry {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
      }

      .entry-icon {
        width: 38px;
        height: 38px;
        border-radius: var(--radius-md);
        background-color: var(--color-primary-50);
        color: var(--color-primary-600);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .entry-text {
        display: flex;
        flex-direction: column;
      }

      .entry-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-neutral-500);
      }

      .entry-val {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--color-primary-800);
        word-break: break-all;

        &:hover {
          color: var(--color-accent-500);
        }
      }

      .response-time-pill {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        flex-wrap: wrap;
        background: var(--color-cream-100);
        border: 1px solid var(--color-cream-300);
        border-radius: var(--radius-full);
        padding: 0.4rem 0.85rem;
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--color-primary-800);
        max-width: 100%;

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--color-success);
          box-shadow: 0 0 6px var(--color-success);
        }
      }

      .trust-badge-card {
        background: linear-gradient(
          135deg,
          var(--color-primary-50) 0%,
          #ffffff 100%
        );
        border: 1px solid var(--color-primary-200);
        border-radius: var(--radius-xl);
        padding: var(--space-6);

        @media (max-width: 480px) {
          padding: var(--space-5);
        }

        .trust-icon {
          font-size: 2rem;
          margin-block-end: var(--space-2);
        }

        .trust-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-primary-900);
          margin-block-end: var(--space-2);
        }

        .trust-desc {
          font-size: 0.88rem;
          color: var(--color-neutral-700);
          line-height: 1.5;
        }
      }

      .mt-6 {
        margin-block-start: var(--space-6);
      }
    `,
  ],
})
export class ContactComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateTags({
      title: "Apply for Access — Buildora Construction Workspace",
      description:
        "Request access and configure your dedicated Buildora workspace for construction project management on Microsoft Power Platform.",
      keywords:
        "Buildora Contact, Workspace Setup, Construction SaaS, Dataverse CRM, Enterprise Deployment",
    });
  }
}
