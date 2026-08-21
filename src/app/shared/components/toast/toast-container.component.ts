import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      <div
        *ngFor="let toast of toastService.toasts()"
        class="toast-item toast-{{ toast.type }}"
        role="alert"
      >
        <div class="toast-icon">
          <span *ngIf="toast.type === 'error'">✕</span>
          <span *ngIf="toast.type === 'success'">✓</span>
          <span *ngIf="toast.type === 'warning'">⚠</span>
          <span *ngIf="toast.type === 'info'">ℹ</span>
        </div>
        <div class="toast-body">
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        <button
          type="button"
          class="toast-close-btn"
          (click)="toastService.dismiss(toast.id)"
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: var(--space-6, 1.5rem);
      inset-inline-end: var(--space-6, 1.5rem);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 420px;
      width: calc(100vw - 2rem);
      pointer-events: none;
    }

    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.9rem 1.1rem;
      border-radius: 12px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08);
      animation: toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      border: 1.5px solid transparent;
      color: #1c1017;
      transition: all 0.25s ease;
    }

    .toast-error {
      background: rgba(255, 245, 245, 0.96);
      border-color: rgba(184, 68, 63, 0.35);
      color: #781d19;

      .toast-icon {
        background: #b8443f;
        color: #ffffff;
      }
    }

    .toast-success {
      background: rgba(244, 250, 246, 0.96);
      border-color: rgba(63, 143, 95, 0.35);
      color: #1b5632;

      .toast-icon {
        background: #3f8f5f;
        color: #ffffff;
      }
    }

    .toast-warning {
      background: rgba(255, 251, 235, 0.96);
      border-color: rgba(217, 164, 65, 0.4);
      color: #7c5208;

      .toast-icon {
        background: #d9a441;
        color: #ffffff;
      }
    }

    .toast-info {
      background: rgba(240, 248, 255, 0.96);
      border-color: rgba(61, 110, 140, 0.35);
      color: #1a4258;

      .toast-icon {
        background: #3d6e8c;
        color: #ffffff;
      }
    }

    .toast-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 900;
      flex-shrink: 0;
    }

    .toast-body {
      flex: 1;
      min-width: 0;
    }

    .toast-message {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 600;
      line-height: 1.4;
      word-break: break-word;
    }

    .toast-close-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
      opacity: 0.6;
      color: inherit;
      padding: 0.2rem;
      transition: opacity 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        opacity: 1;
      }
    }

    @keyframes toastSlideIn {
      from {
        opacity: 0;
        transform: translateY(-16px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 480px) {
      .toast-container {
        top: var(--space-4, 1rem);
        inset-inline: var(--space-4, 1rem);
        width: calc(100vw - 2rem);
      }
    }
  `]
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
