import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lab-control',
  standalone: true,
  imports: [],
  template: `
    <div>
      <label [for]="controlName()">{{ labelCaption() }}</label>
      <ng-content></ng-content>
      <small>For control errors</small>
    </div>
  `,
})
export class ControlBlock {
  // Input signals

  /**
   * Label caption
   * - If not provided, control name will be used
   */
  label = input<string>();

  /**
   * Control name
   */
  controlName = input.required<string>();

  labelCaption = computed(
    () =>
      this.label() ||
      this.controlName().charAt(0).toUpperCase() + this.controlName().slice(1)
  );
}
