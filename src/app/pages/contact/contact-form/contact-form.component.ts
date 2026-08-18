import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CompanyApplicationService } from '../../../core/services/company-application.service';
import { CompanyApplication, ApplicationSubmissionResponse } from '../../../core/models/company-application.model';
import { ShinyButtonComponent } from '../../../shared/components/shiny-button/shiny-button.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ShinyButtonComponent],
  template: `
    <div class="form-container-card buildora-card">
      <!-- Success State Banner / Confirmation -->
      <div *ngIf="submitStatus() === 'success'" class="submission-state state-success" role="alert">
        <div class="state-icon success-icon">✓</div>
        <h3 class="state-title">{{ 'form.successTitle' | translate }}</h3>
        <p class="state-msg">{{ 'form.successMessage' | translate }}</p>
        <div *ngIf="applicationRefId()" class="ref-badge">
          Application Reference: <strong>{{ applicationRefId() }}</strong>
        </div>
        <button type="button" class="btn btn-secondary mt-4" (click)="resetForm()">
          {{ 'form.resetButton' | translate }}
        </button>
      </div>

      <!-- Error State Notice -->
      <div *ngIf="submitStatus() === 'error'" class="submission-state state-error mb-6" role="alert">
        <div class="state-icon error-icon">✕</div>
        <h3 class="state-title">{{ 'form.errorTitle' | translate }}</h3>
        <p class="state-msg">{{ 'form.errorMessage' | translate }}</p>
      </div>

      <!-- Reactive Form -->
      <form 
        *ngIf="submitStatus() !== 'success'" 
        [formGroup]="contactForm" 
        (ngSubmit)="onSubmit()" 
        novalidate
        aria-label="Buildora Company Application Form"
      >
        <!-- FIELDSET 1: Company Information -->
        <fieldset class="form-section">
          <legend class="section-legend">
            <span class="legend-num">1</span>
            <span>{{ 'form.companySection' | translate }}</span>
          </legend>

          <div class="form-grid">
            <!-- Company Name -->
            <div class="form-group" [class.has-error]="isInvalid('companyName')">
              <label for="companyName" class="form-label">
                {{ 'form.companyName' | translate }} <span class="required-star">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                class="form-control"
                formControlName="companyName"
                [placeholder]="'form.companyNamePlaceholder' | translate"
                [attr.aria-invalid]="isInvalid('companyName')"
                aria-describedby="companyName-error"
              />
              <div *ngIf="isInvalid('companyName')" id="companyName-error" class="error-feedback" role="alert">
                <span *ngIf="contactForm.get('companyName')?.hasError('required')">{{ 'validation.required' | translate }}</span>
                <span *ngIf="contactForm.get('companyName')?.hasError('minlength')">{{ 'validation.minlength' | translate }}</span>
              </div>
            </div>

            <!-- Industry / Company Type -->
            <div class="form-group" [class.has-error]="isInvalid('companyType')">
              <label for="companyType" class="form-label">
                {{ 'form.companyType' | translate }} <span class="required-star">*</span>
              </label>
              <select
                id="companyType"
                class="form-control form-select"
                formControlName="companyType"
                [attr.aria-invalid]="isInvalid('companyType')"
                aria-describedby="companyType-error"
              >
                <option value="" disabled selected>{{ 'form.companyTypePlaceholder' | translate }}</option>
                <option value="construction">{{ 'form.companyTypeOptions.construction' | translate }}</option>
                <option value="consultancy">{{ 'form.companyTypeOptions.consultancy' | translate }}</option>
                <option value="infrastructure">{{ 'form.companyTypeOptions.infrastructure' | translate }}</option>
                <option value="fitout">{{ 'form.companyTypeOptions.fitout' | translate }}</option>
                <option value="other">{{ 'form.companyTypeOptions.other' | translate }}</option>
              </select>
              <div *ngIf="isInvalid('companyType')" id="companyType-error" class="error-feedback" role="alert">
                <span>{{ 'validation.required' | translate }}</span>
              </div>
            </div>

            <!-- Company Size -->
            <div class="form-group" [class.has-error]="isInvalid('companySize')">
              <label for="companySize" class="form-label">
                {{ 'form.companySize' | translate }} <span class="required-star">*</span>
              </label>
              <select
                id="companySize"
                class="form-control form-select"
                formControlName="companySize"
                [attr.aria-invalid]="isInvalid('companySize')"
                aria-describedby="companySize-error"
              >
                <option value="" disabled selected>{{ 'form.companySizePlaceholder' | translate }}</option>
                <option value="tier1">{{ 'form.companySizeOptions.tier1' | translate }}</option>
                <option value="tier2">{{ 'form.companySizeOptions.tier2' | translate }}</option>
                <option value="tier3">{{ 'form.companySizeOptions.tier3' | translate }}</option>
                <option value="tier4">{{ 'form.companySizeOptions.tier4' | translate }}</option>
              </select>
              <div *ngIf="isInvalid('companySize')" id="companySize-error" class="error-feedback" role="alert">
                <span>{{ 'validation.required' | translate }}</span>
              </div>
            </div>

            <!-- Country / Location -->
            <div class="form-group" [class.has-error]="isInvalid('country')">
              <label for="country" class="form-label">
                {{ 'form.country' | translate }} <span class="required-star">*</span>
              </label>
              <input
                id="country"
                type="text"
                class="form-control"
                formControlName="country"
                [placeholder]="'form.countryPlaceholder' | translate"
                [attr.aria-invalid]="isInvalid('country')"
                aria-describedby="country-error"
              />
              <div *ngIf="isInvalid('country')" id="country-error" class="error-feedback" role="alert">
                <span>{{ 'validation.required' | translate }}</span>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- FIELDSET 2: Contact Person -->
        <fieldset class="form-section">
          <legend class="section-legend">
            <span class="legend-num">2</span>
            <span>{{ 'form.contactSection' | translate }}</span>
          </legend>

          <div class="form-grid">
            <!-- Full Name -->
            <div class="form-group" [class.has-error]="isInvalid('fullName')">
              <label for="fullName" class="form-label">
                {{ 'form.fullName' | translate }} <span class="required-star">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                class="form-control"
                formControlName="fullName"
                [placeholder]="'form.fullNamePlaceholder' | translate"
                [attr.aria-invalid]="isInvalid('fullName')"
                aria-describedby="fullName-error"
              />
              <div *ngIf="isInvalid('fullName')" id="fullName-error" class="error-feedback" role="alert">
                <span *ngIf="contactForm.get('fullName')?.hasError('required')">{{ 'validation.required' | translate }}</span>
                <span *ngIf="contactForm.get('fullName')?.hasError('minlength')">{{ 'validation.minlength' | translate }}</span>
              </div>
            </div>

            <!-- Job Title -->
            <div class="form-group">
              <label for="jobTitle" class="form-label">
                {{ 'form.jobTitle' | translate }}
              </label>
              <input
                id="jobTitle"
                type="text"
                class="form-control"
                formControlName="jobTitle"
                [placeholder]="'form.jobTitlePlaceholder' | translate"
              />
            </div>

            <!-- Email -->
            <div class="form-group" [class.has-error]="isInvalid('email')">
              <label for="email" class="form-label">
                {{ 'form.email' | translate }} <span class="required-star">*</span>
              </label>
              <input
                id="email"
                type="email"
                class="form-control"
                formControlName="email"
                [placeholder]="'form.emailPlaceholder' | translate"
                [attr.aria-invalid]="isInvalid('email')"
                aria-describedby="email-error"
              />
              <div *ngIf="isInvalid('email')" id="email-error" class="error-feedback" role="alert">
                <span *ngIf="contactForm.get('email')?.hasError('required')">{{ 'validation.required' | translate }}</span>
                <span *ngIf="contactForm.get('email')?.hasError('email')">{{ 'validation.email' | translate }}</span>
              </div>
            </div>

            <!-- Phone Number -->
            <div class="form-group" [class.has-error]="isInvalid('phone')">
              <label for="phone" class="form-label">
                {{ 'form.phone' | translate }} <span class="required-star">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                class="form-control"
                formControlName="phone"
                [placeholder]="'form.phonePlaceholder' | translate"
                [attr.aria-invalid]="isInvalid('phone')"
                aria-describedby="phone-error"
              />
              <div *ngIf="isInvalid('phone')" id="phone-error" class="error-feedback" role="alert">
                <span *ngIf="contactForm.get('phone')?.hasError('required')">{{ 'validation.required' | translate }}</span>
                <span *ngIf="contactForm.get('phone')?.hasError('pattern')">{{ 'validation.phone' | translate }}</span>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- FIELDSET 3: Application Details -->
        <fieldset class="form-section">
          <legend class="section-legend">
            <span class="legend-num">3</span>
            <span>{{ 'form.detailsSection' | translate }}</span>
          </legend>

          <!-- Number of Active Projects -->
          <div class="form-group mb-6" [class.has-error]="isInvalid('activeProjects')">
            <label for="activeProjects" class="form-label">
              {{ 'form.activeProjects' | translate }}
            </label>
            <input
              id="activeProjects"
              type="number"
              min="0"
              class="form-control form-control-sm-w"
              formControlName="activeProjects"
              [placeholder]="'form.activeProjectsPlaceholder' | translate"
            />
            <div *ngIf="isInvalid('activeProjects')" class="error-feedback" role="alert">
              <span>{{ 'validation.min' | translate }}</span>
            </div>
          </div>

          <!-- Multi-select Management Goals Checkboxes -->
          <div class="form-group mb-6">
            <label class="form-label mb-3">
              {{ 'form.managementGoals' | translate }}
            </label>
            <div class="checkbox-grid">
              <label class="custom-checkbox-card" *ngFor="let goal of goalOptions">
                <input 
                  type="checkbox" 
                  [value]="goal.key" 
                  (change)="onGoalCheckboxChange($event, goal.key)"
                  [checked]="isGoalSelected(goal.key)"
                />
                <span class="checkbox-box"></span>
                <span class="checkbox-label">{{ 'form.goalsOptions.' + goal.key | translate }}</span>
              </label>
            </div>
          </div>

          <!-- Additional Message -->
          <div class="form-group">
            <label for="additionalMessage" class="form-label">
              {{ 'form.message' | translate }}
            </label>
            <textarea
              id="additionalMessage"
              class="form-control"
              rows="4"
              formControlName="additionalMessage"
              [placeholder]="'form.messagePlaceholder' | translate"
            ></textarea>
          </div>
        </fieldset>

        <!-- FIELDSET 4: Consent & Submission -->
        <div class="form-submission-group">
          <!-- Declaration Checkbox -->
          <div class="form-group" [class.has-error]="isInvalid('consent')">
            <label class="consent-checkbox-label">
              <input 
                type="checkbox" 
                formControlName="consent" 
                id="consent"
                [attr.aria-invalid]="isInvalid('consent')"
                aria-describedby="consent-error"
              />
              <span class="checkbox-box"></span>
              <span class="consent-text">{{ 'form.consent' | translate }} <span class="required-star">*</span></span>
            </label>
            <div *ngIf="isInvalid('consent')" id="consent-error" class="error-feedback mt-1" role="alert">
              <span>{{ 'validation.consentRequired' | translate }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="submit-action-row">
            <app-shiny-button
              [type]="'submit'"
              [variant]="'primary'"
              [size]="'lg'"
              [loading]="isSubmitting()"
              [loadingText]="'form.submitting' | translate"
              [text]="'form.submit' | translate"
              [disabled]="isSubmitting()"
            ></app-shiny-button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container-card {
      background: #FFFFFF;
      border: 1px solid var(--color-primary-100);
      border-radius: var(--radius-xl);
      padding: var(--space-10);
      box-shadow: var(--shadow-lg);

      @media (max-width: 768px) {
        padding: var(--space-6);
      }
    }

    .form-section {
      border: none;
      padding: 0;
      margin: 0;
      margin-block-end: var(--space-8);
      border-block-end: 1px solid var(--color-neutral-100);
      padding-block-end: var(--space-8);
    }

    .section-legend {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary-800);
      margin-block-end: var(--space-6);
      padding: 0;

      .legend-num {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--color-primary-50);
        color: var(--color-primary-600);
        border: 1px solid var(--color-primary-200);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: 800;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-5);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      position: relative;
    }

    .form-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-primary-900);
    }

    .required-star {
      color: var(--color-error);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
      color: var(--color-text);
      background-color: var(--color-neutral-50);
      border: 1.5px solid var(--color-neutral-300);
      border-radius: var(--radius-md);
      transition: var(--transition-standard);

      &:focus {
        outline: none;
        border-color: var(--color-primary-500);
        background-color: #FFFFFF;
        box-shadow: 0 0 0 4px rgba(100, 57, 81, 0.1);
      }

      &::placeholder {
        color: var(--color-neutral-500);
        opacity: 0.7;
      }
    }

    .form-select {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23643951' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.1em;
      padding-inline-end: 2.5rem;

      [dir="rtl"] & {
        background-position: left 1rem center;
      }
    }

    .form-control-sm-w {
      max-width: 280px;
    }

    .has-error .form-control {
      border-color: var(--color-error);
      background-color: #FFF8F8;
    }

    .error-feedback {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--color-error);
    }

    /* Custom Checkbox Grid */
    .checkbox-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-3);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .custom-checkbox-card {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      background-color: var(--color-neutral-50);
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: var(--transition-standard);
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkbox-box {
        width: 20px;
        height: 20px;
        border-radius: var(--radius-sm);
        border: 2px solid var(--color-primary-300);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition-standard);
        flex-shrink: 0;
        background: #FFFFFF;
      }

      input:checked ~ .checkbox-box {
        background-color: var(--color-accent-500);
        border-color: var(--color-accent-500);
        &::after {
          content: '✓';
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 900;
        }
      }

      &:hover {
        border-color: var(--color-primary-500);
        background-color: #FFFFFF;
      }

      .checkbox-label {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-primary-800);
      }
    }

    /* Consent Checkbox */
    .consent-checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      cursor: pointer;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
      }

      .checkbox-box {
        width: 22px;
        height: 22px;
        border-radius: var(--radius-sm);
        border: 2px solid var(--color-primary-400);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
        background: #FFFFFF;
      }

      input:checked ~ .checkbox-box {
        background-color: var(--color-primary-500);
        border-color: var(--color-primary-500);
        &::after {
          content: '✓';
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 900;
        }
      }

      .consent-text {
        font-size: 0.92rem;
        color: var(--color-neutral-700);
        line-height: 1.5;
      }
    }

    .submit-action-row {
      margin-block-start: var(--space-6);
      display: flex;
      justify-content: flex-start;
    }

    /* State Feedback */
    .submission-state {
      text-align: center;
      padding: var(--space-10) var(--space-6);
      border-radius: var(--radius-lg);

      .state-icon {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 800;
        margin-inline: auto;
        margin-block-end: var(--space-4);
      }

      &.state-success {
        background: #F4FAF6;
        border: 1px solid rgba(63, 143, 95, 0.3);
        .success-icon {
          background: var(--color-success);
          color: #FFFFFF;
        }
      }

      &.state-error {
        background: #FFF5F5;
        border: 1px solid rgba(184, 68, 63, 0.3);
        .error-icon {
          background: var(--color-error);
          color: #FFFFFF;
        }
      }

      .state-title {
        font-size: 1.6rem;
        font-weight: 800;
        margin-block-end: var(--space-2);
      }

      .state-msg {
        font-size: 1.05rem;
        color: var(--color-neutral-700);
        max-width: 540px;
        margin-inline: auto;
      }

      .ref-badge {
        display: inline-block;
        margin-block-start: var(--space-4);
        padding: var(--space-2) var(--space-4);
        background: #FFFFFF;
        border: 1px solid var(--color-primary-200);
        border-radius: var(--radius-full);
        font-size: 0.9rem;
        color: var(--color-primary-800);
      }
    }

    .mb-6 { margin-block-end: var(--space-6); }
    .mt-4 { margin-block-start: var(--space-4); }
    .mt-1 { margin-block-start: var(--space-1); }
  `]
})
export class ContactFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly appService = inject(CompanyApplicationService);

  contactForm!: FormGroup;
  selectedGoals: string[] = [];

  isSubmitting = signal<boolean>(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  applicationRefId = signal<string>('');

  readonly goalOptions = [
    { key: 'tracking' },
    { key: 'milestones' },
    { key: 'finance' },
    { key: 'documents' },
    { key: 'reporting' }
  ];

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      companyType: ['', [Validators.required]],
      companySize: ['', [Validators.required]],
      country: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      jobTitle: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+0-9\s\-()]{7,25}$/)]],
      activeProjects: [null, [Validators.min(0)]],
      additionalMessage: [''],
      consent: [false, [Validators.requiredTrue]]
    });
  }

  isInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onGoalCheckboxChange(event: Event, goalKey: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.selectedGoals.includes(goalKey)) {
        this.selectedGoals.push(goalKey);
      }
    } else {
      this.selectedGoals = this.selectedGoals.filter((g) => g !== goalKey);
    }
  }

  isGoalSelected(goalKey: string): boolean {
    return this.selectedGoals.includes(goalKey);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    const formVal = this.contactForm.value;
    const payload: CompanyApplication = {
      companyName: formVal.companyName,
      companyType: formVal.companyType,
      companySize: formVal.companySize,
      country: formVal.country,
      fullName: formVal.fullName,
      jobTitle: formVal.jobTitle,
      email: formVal.email,
      phone: formVal.phone,
      activeProjects: formVal.activeProjects ? Number(formVal.activeProjects) : undefined,
      managementGoals: [...this.selectedGoals],
      additionalMessage: formVal.additionalMessage,
      consent: formVal.consent
    };

    this.appService.submitApplication(payload).subscribe({
      next: (res: ApplicationSubmissionResponse) => {
        this.isSubmitting.set(false);
        this.submitStatus.set('success');
        if (res.applicationId) {
          this.applicationRefId.set(res.applicationId);
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitStatus.set('error');
      }
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.selectedGoals = [];
    this.submitStatus.set('idle');
  }
}
