import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private nextId = 1;
  readonly toasts = signal<ToastMessage[]>([]);

  show(message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error', duration = 4500): void {
    const id = this.nextId++;
    const toast: ToastMessage = { id, message, type, duration };

    this.toasts.update((current) => [...current, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  error(message: string, duration = 4500): void {
    this.show(message, 'error', duration);
  }

  success(message: string, duration = 4500): void {
    this.show(message, 'success', duration);
  }

  warning(message: string, duration = 4500): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration = 4500): void {
    this.show(message, 'info', duration);
  }

  dismiss(id: number): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
