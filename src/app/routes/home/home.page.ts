import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>Home</h1>`,
})
export default class HomePage {}
