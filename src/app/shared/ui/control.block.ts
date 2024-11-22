import { JsonPipe } from '@angular/common';
import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { titleCase } from '../utils/string.utils';

@Component({
    selector: 'lab-control',
    imports: [FormsModule, JsonPipe],
    styles: [
        `
      small {
        color: rgb(175, 66, 64);
      }
    `,
    ],
    template: `
    <div>
      <label [for]="controlName()">{{ labelCaption() }}</label>
      <ng-content></ng-content>
      @if (control().errors) {
        <small>{{ control().errors | json }}</small>
      }
    </div>
  `
})
export class ControlBlock {
  // Input signals

  /**
   * Label caption
   * - If not provided, control name will be used
   */
  label: InputSignal<string | undefined> = input<string>();

  /**
   * NgModel control
   * - the required reference to the NgModel control
   */
  control: InputSignal<NgModel> = input.required<NgModel>();

  // Computed signals

  /**
   * Control name
   */
  controlName: Signal<string> = computed(() => this.control().name);

  /**
   * Computed signal for label caption
   */
  labelCaption: Signal<string> = computed(
    () => this.label() || titleCase(this.controlName()),
  );
}
