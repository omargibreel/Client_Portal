import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-reveal-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="reveal-container" [attr.aria-label]="text">
      <!-- If Arabic, animate whole word/text to preserve cursive ligatures -->
      <ng-container *ngIf="isArabic; else latinChars">
        <span class="reveal-word" aria-hidden="true">{{ text }}</span>
      </ng-container>

      <!-- If Latin, animate char by char -->
      <ng-template #latinChars>
        <span 
          *ngFor="let char of characters; let i = index" 
          class="reveal-char" 
          [style.animation-delay]="(i * delay) + 'ms'"
          aria-hidden="true"
        >{{ char === ' ' ? '&nbsp;' : char }}</span>
      </ng-template>
    </span>
  `,
  styles: [`
    .reveal-container {
      display: inline-block;
      white-space: nowrap;
    }

    .reveal-char {
      display: inline-block;
      opacity: 0;
      filter: blur(12px);
      transform: translateY(20px) scale(0.9);
      animation: blurRevealIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .reveal-word {
      display: inline-block;
      opacity: 0;
      filter: blur(14px);
      transform: translateY(18px) scale(0.95);
      animation: blurRevealIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      font-family: 'Cairo', 'Tajawal', sans-serif;
    }

    @keyframes blurRevealIn {
      0% {
        opacity: 0;
        filter: blur(12px);
        transform: translateY(20px) scale(0.9);
      }
      100% {
        opacity: 1;
        filter: blur(0px);
        transform: translateY(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal-char, .reveal-word {
        opacity: 1 !important;
        filter: none !important;
        transform: none !important;
        animation: none !important;
      }
    }
  `]
})
export class BrandRevealTextComponent implements OnChanges {
  @Input() text = 'BUILDORA';
  @Input() delay = 45; // ms per character

  characters: string[] = [];
  isArabic = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.isArabic = /[\u0600-\u06FF]/.test(this.text || '');
      this.characters = Array.from(this.text || '');
    }
  }
}
