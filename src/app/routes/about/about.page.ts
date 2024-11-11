import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>About</h1>`,
})
export default class AboutPage {}
