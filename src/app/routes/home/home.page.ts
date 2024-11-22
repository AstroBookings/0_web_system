import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * HomePage component
 * - Routed page for the home
 */
@Component({
  selector: 'lab-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>Home</h1>`,
})
export default class HomePage {}
