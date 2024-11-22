import { JsonPipe } from '@angular/common';
import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { titleCase } from '../utils/string.utils';

/**
 * ControlBlock component
 * - Displays a label and the control errors
 */
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
  `,
})
export class ControlBlock {
  // Input signals

  /**
   * Label caption
   * - If not provided, control name will be used
   */
  readonly label: InputSignal<string | undefined> = input<string>();

  /**
   * NgModel control
   * - the required reference to the NgModel control
   */
  readonly control: InputSignal<NgModel> = input.required<NgModel>();

  // Computed signals

  /**
   * Control name
   */
  readonly controlName: Signal<string> = computed(() => this.control().name);

  /**
   * Computed signal for label caption
   */
  readonly labelCaption: Signal<string> = computed(() => this.label() || titleCase(this.controlName()));
}
