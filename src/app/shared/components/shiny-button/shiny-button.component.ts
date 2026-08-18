import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticHoverDirective } from '../../../core/directives/magnetic-hover.directive';

@Component({
  selector: 'app-shiny-button',
  standalone: true,
  imports: [CommonModule, MagneticHoverDirective],
  template: `
    <button 
      [type]="type"
      [disabled]="disabled || loading"
      [class]="'btn ' + variantClass + ' ' + sizeClass + ' ' + (loading ? 'is-loading' : '')"
      [attr.aria-busy]="loading"
      [attr.aria-label]="ariaLabel || text"
      appMagneticHover
      [magneticStrength]="magnetic ? 0.25 : 0"
      (click)="onClick($event)"
    >
      <span class="btn-content" [style.opacity]="loading ? '0' : '1'">
        <ng-content select="[slot=prefix]"></ng-content>
        <span class="btn-text">{{ text }}</span>
        <ng-content></ng-content>
        <ng-content select="[slot=suffix]"></ng-content>
      </span>

      <!-- Loading Spinner -->
      <span *ngIf="loading" class="spinner-wrapper" aria-hidden="true">
        <svg class="spinner-svg" viewBox="0 0 24 24" fill="none">
          <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.3"></circle>
          <path class="spinner-blade" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span *ngIf="loadingText" class="loading-label">{{ loadingText }}</span>
      </span>

      <!-- Light Sweep Glint -->
      <span class="glint" aria-hidden="true"></span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-standard);
      cursor: pointer;
      font-weight: 700;
      border: none;
      border-radius: var(--radius-md);

      &:disabled {
        opacity: 0.65;
        cursor: not-allowed;
        transform: none !important;
      }
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-600) 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 18px rgba(201, 123, 74, 0.35);

      &:hover:not(:disabled) {
        box-shadow: 0 8px 25px rgba(201, 123, 74, 0.5);
      }
    }

    .btn-plum {
      background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%);
      color: var(--color-cream-100);
      box-shadow: 0 4px 16px rgba(100, 57, 81, 0.3);

      &:hover:not(:disabled) {
        box-shadow: 0 8px 24px rgba(100, 57, 81, 0.45);
      }
    }

    .btn-cream {
      background: linear-gradient(135deg, var(--color-cream-200) 0%, #FFFFFF 100%);
      color: var(--color-primary-900);
      box-shadow: 0 4px 16px rgba(255, 248, 203, 0.4);

      &:hover:not(:disabled) {
        box-shadow: var(--shadow-glow);
      }
    }

    .btn-md {
      padding-inline: var(--space-6);
      padding-block: 0.85rem;
      font-size: 1rem;
    }

    .btn-lg {
      padding-inline: var(--space-8);
      padding-block: 1.1rem;
      font-size: 1.125rem;
      border-radius: var(--radius-lg);
    }

    .btn-content {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      transition: opacity 0.2s ease;
    }

    /* Glint Sheen Animation */
    .glint {
      position: absolute;
      top: 0;
      inset-inline-start: -150%;
      width: 70%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg);
      pointer-events: none;
    }

    button:hover:not(:disabled) .glint {
      animation: shinySweep 1.2s ease-in-out infinite;
    }

    /* Spinner */
    .spinner-wrapper {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
    }

    .spinner-svg {
      width: 22px;
      height: 22px;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ShinyButtonComponent {
  @Input() text = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'plum' | 'cream' = 'primary';
  @Input() size: 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = '';
  @Input() magnetic = true;
  @Input() ariaLabel = '';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get variantClass(): string {
    return `btn-${this.variant}`;
  }

  get sizeClass(): string {
    return `btn-${this.size}`;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
