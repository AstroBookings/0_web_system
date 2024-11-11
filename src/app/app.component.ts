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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lab-header />
    <router-outlet />
  `,
})
export class AppComponent {}
