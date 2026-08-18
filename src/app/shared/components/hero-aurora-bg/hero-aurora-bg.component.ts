import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-aurora-bg',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="aurora-wrapper" aria-hidden="true">
      <!-- Architectural Grid Lines Overlay -->
      <div class="blueprint-grid"></div>

      <!-- Glowing Drift Orbs using exact brand tokens -->
      <div class="aurora-orb orb-primary"></div>
      <div class="aurora-orb orb-accent"></div>
      <div class="aurora-orb orb-cream"></div>
      <div class="aurora-orb orb-deep"></div>

      <!-- Vignette and Soft Blur Overlay -->
      <div class="aurora-backdrop"></div>
    </div>
  `,
  styles: [`
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }

    .aurora-wrapper {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 20%, rgba(100, 57, 81, 0.08) 0%, transparent 70%),
                  radial-gradient(circle at 80% 80%, rgba(201, 123, 74, 0.06) 0%, transparent 60%);
    }

    /* Blueprint CAD / Architectural Subtle Grid */
    .blueprint-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(100, 57, 81, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(100, 57, 81, 0.05) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(circle at 50% 40%, black 30%, transparent 80%);
      -webkit-mask-image: radial-gradient(circle at 50% 40%, black 30%, transparent 80%);
    }

    .aurora-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.55;
      animation: auroraDrift 22s ease-in-out infinite alternate;
      will-change: transform, opacity;
    }

    .orb-primary {
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, var(--color-primary-400) 0%, rgba(100, 57, 81, 0) 70%);
      top: -120px;
      inset-inline-start: 15%;
      animation-duration: 26s;
    }

    .orb-accent {
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, var(--color-accent-500) 0%, rgba(201, 123, 74, 0) 70%);
      top: 100px;
      inset-inline-end: 10%;
      animation-duration: 20s;
      animation-delay: -5s;
    }

    .orb-cream {
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, var(--color-cream-300) 0%, rgba(255, 248, 203, 0) 70%);
      bottom: -60px;
      inset-inline-start: 35%;
      animation-duration: 24s;
      animation-delay: -10s;
    }

    .orb-deep {
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--color-primary-600) 0%, rgba(82, 46, 66, 0) 70%);
      top: 40%;
      inset-inline-start: -150px;
      animation-duration: 30s;
      opacity: 0.35;
    }

    .aurora-backdrop {
      position: absolute;
      inset: 0;
      backdrop-filter: blur(35px);
      -webkit-backdrop-filter: blur(35px);
    }

    @media (prefers-reduced-motion: reduce) {
      .aurora-orb {
        animation: none !important;
      }
    }
  `]
})
export class HeroAuroraBackgroundComponent {}
