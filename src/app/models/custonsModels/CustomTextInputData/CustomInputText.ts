export class CustomInputText {
  controlName: string;
  placeholder: string;
  id: string;
  label: string;
  forLabel: string;
  disabled: boolean;

  constructor(controlName: string, placeholder: string, idName: string, label: string, forLabel: string, disabled: boolean) {
    this.controlName = controlName;
    this.placeholder = placeholder;
    this.id = idName;
    this.label = label;
    this.forLabel = forLabel;
    this.disabled = disabled;
  }
}
