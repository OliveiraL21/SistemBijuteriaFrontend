export class CustomButton {
  label: string;
  rounded: boolean;
  severity: string;
  stylesClasses: string;
  icon: string;
  tooltip: string;
  ClickAction: (id: any, data: any) => void;


  constructor(label: string, rounded: boolean, styles: string, severity: string, icon: string, tootip: string = "", click: (id: any, data: any) => void = () => { }) {
    this.label = label;
    this.rounded = rounded;
    this.stylesClasses = styles;
    this.severity = severity;
    this.icon = icon;
    this.tooltip = tootip;
    this.ClickAction = click;
  }
}
