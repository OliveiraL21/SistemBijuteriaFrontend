import { Component, Input } from '@angular/core';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() custom!: CustomButton;
}
