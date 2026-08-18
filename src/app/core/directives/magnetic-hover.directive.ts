import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appMagneticHover]',
  standalone: true
})
export class MagneticHoverDirective {
  private readonly el = inject(ElementRef);
  
  @Input() magneticStrength = 0.3; // Pull intensity

  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.prefersReducedMotion()) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    const rect = nativeEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * this.magneticStrength;
    const deltaY = (event.clientY - centerY) * this.magneticStrength;

    nativeEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    nativeEl.style.transition = 'transform 0.1s ease-out';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.prefersReducedMotion()) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.style.transform = 'translate(0px, 0px)';
    nativeEl.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  }
}
