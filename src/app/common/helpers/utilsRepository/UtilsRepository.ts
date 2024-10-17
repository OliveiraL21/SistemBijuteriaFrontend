import { AbstractControl, FormGroup } from "@angular/forms";

export class UtilsRepository {

  static getRequiredFieldsInvalid(form: FormGroup) {
    Object.values(form.controls).forEach((field: AbstractControl) => {
      if (field.hasError('required')) {
        field.markAsDirty();
        field.updateValueAndValidity();
      }
    });
  }
}
