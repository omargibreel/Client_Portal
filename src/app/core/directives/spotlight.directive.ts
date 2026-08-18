import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective implements OnInit {
  private readonly el = inject(ElementRef);

  @Input() spotlightColor = 'rgba(255, 248, 203, 0.16)';
  @Input() spotlightRadius = 320;

  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.style.position = 'relative';
    nativeEl.style.overflow = 'hidden';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.prefersReducedMotion()) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    const rect = nativeEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    nativeEl.style.setProperty('--spotlight-x', `${x}px`);
    nativeEl.style.setProperty('--spotlight-y', `${y}px`);
    nativeEl.style.setProperty('--spotlight-opacity', '1');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.prefersReducedMotion()) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.style.setProperty('--spotlight-opacity', '0');
  }
}
