import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>🎟️ Bookings</h1>`,
})
export default class BookingsPage {}
