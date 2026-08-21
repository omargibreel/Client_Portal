import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LanguageService } from './core/services/language.service';
import { ToastContainerComponent } from './shared/components/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, ToastContainerComponent],
  template: `
    <div class="app-layout" [attr.dir]="langService.currentDir()" [attr.lang]="langService.currentLang()">
      <app-toast-container></app-toast-container>
      <app-navbar></app-navbar>
      
      <div class="main-content-outlet">
        <router-outlet></router-outlet>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--color-bg);
      color: var(--color-text);
    }

    .main-content-outlet {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AppComponent {
  // Inject LanguageService so initial language and direction are applied immediately
  readonly langService = inject(LanguageService);
}
