import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private observer?: IntersectionObserver;

  @Input() countTo = 0;
  @Input() countFrom = 0;
  @Input() duration = 2000; // ms
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() isCurrency = false;

  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;

    if (this.prefersReducedMotion()) {
      nativeEl.textContent = this.formatValue(this.countTo);
      return;
    }

    // Set initial from value
    nativeEl.textContent = this.formatValue(this.countFrom);

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.startCountUp();
              this.observer?.unobserve(nativeEl);
            }
          });
        },
        { threshold: 0.2 }
      );
      this.observer.observe(nativeEl);
    } else {
      this.startCountUp();
    }
  }

  private startCountUp(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;
    const startTime = performance.now();
    const startVal = this.countFrom;
    const endVal = this.countTo;
    const duration = this.duration;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(startVal + (endVal - startVal) * easeProgress);

      nativeEl.textContent = this.formatValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        nativeEl.textContent = this.formatValue(endVal);
      }
    };

    requestAnimationFrame(animate);
  }

  private formatValue(val: number): string {
    const formattedNum = val.toLocaleString();
    return `${this.prefix}${formattedNum}${this.suffix}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
