import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFormControls } from '../../models/custonsModels/CustomFormData/CustomFormControls';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
})
export class CustomFormComponent {
  @Input() form!: FormGroup;
  @Input() controls?: CustomFormControls[];
  @Output() FileEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  fileChange(fileBase64: string) {
    this.FileEvent.emit(fileBase64);
  }


}
