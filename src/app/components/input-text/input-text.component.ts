import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomInputText } from '../../models/custonsModels/CustomTextInputData/CustomInputText';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() form!: FormGroup;
  @Input() controlData!: CustomInputText;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event: any) {
    this.valueChange.emit(event);
  }
}
