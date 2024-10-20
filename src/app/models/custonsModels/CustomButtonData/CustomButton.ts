export class CustomButton {
  label: string;
  rounded: boolean;
  severity: string;
  stylesClasses: string;


  constructor(label: string, rounded: boolean, styles: string, severity: string) {
    this.label = label;
    this.rounded = rounded;
    this.stylesClasses = styles;
    this.severity = severity;

  }
}
