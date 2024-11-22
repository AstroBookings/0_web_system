import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header.component';

/**
 * AppComponent
 * - Root component
 * - Contains the header and the router outlet
 */
@Component({
  selector: 'lab-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lab-header />
    <router-outlet />
    <footer>
      <p>© 2024 Lab</p>
    </footer>
  `,
})
export class AppComponent {}
