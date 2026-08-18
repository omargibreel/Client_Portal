import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private observer?: IntersectionObserver;

  @Input() revealDelay = 0; // ms
  @Input() revealDistance = 30; // px
  @Input() revealDuration = 700; // ms
  @Input() revealDirection: 'up' | 'down' | 'left' | 'right' = 'up';

  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;

    if (this.prefersReducedMotion()) {
      nativeEl.style.opacity = '1';
      nativeEl.style.transform = 'none';
      return;
    }

    // Initial hidden state
    let initialTransform = `translateY(${this.revealDistance}px)`;
    if (this.revealDirection === 'down') initialTransform = `translateY(-${this.revealDistance}px)`;
    if (this.revealDirection === 'left') initialTransform = `translateX(${this.revealDistance}px)`;
    if (this.revealDirection === 'right') initialTransform = `translateX(-${this.revealDistance}px)`;

    nativeEl.style.opacity = '0';
    nativeEl.style.transform = initialTransform;
    nativeEl.style.transition = `opacity ${this.revealDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${this.revealDelay}ms, transform ${this.revealDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${this.revealDelay}ms`;
    nativeEl.style.willChange = 'opacity, transform';

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              nativeEl.style.opacity = '1';
              nativeEl.style.transform = 'translate(0, 0)';
              this.observer?.unobserve(nativeEl);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      this.observer.observe(nativeEl);
    } else {
      nativeEl.style.opacity = '1';
      nativeEl.style.transform = 'none';
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
