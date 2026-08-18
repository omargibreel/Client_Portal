import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appTiltedCard]',
  standalone: true
})
export class TiltedCardDirective implements OnInit {
  private readonly el = inject(ElementRef);

  @Input() maxTilt = 10; // Max rotation degrees
  @Input() perspective = 1000; // Perspective in px
  @Input() scale = 1.03; // Hover scale

  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.style.transformStyle = 'preserve-3d';
    nativeEl.style.willChange = 'transform';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.prefersReducedMotion()) return;
    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.style.transition = 'transform 0.15s ease-out';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.prefersReducedMotion()) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    const rect = nativeEl.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / height - 0.5) * 2; // -1 to 1

    const rotateX = -yPct * this.maxTilt;
    const rotateY = xPct * this.maxTilt;

    nativeEl.style.transform = `perspective(${this.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.scale}, ${this.scale}, ${this.scale})`;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.prefersReducedMotion()) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    nativeEl.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }
}
