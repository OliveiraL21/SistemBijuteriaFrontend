import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import CustomToastMessage from '../../../models/custonsModels/CustomMessage/CustomToastMessage';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.css'],
  providers: [MessageService]
})
export class CustomToastComponent implements OnInit {

  @Input() customMessage!: CustomToastMessage;
  @Input() customButton!: CustomButton;
  constructor(private messageService: MessageService) { }

  showMessage() {
    this.messageService.add({ severity: this.customMessage.type, summary: this.customMessage.title, detail: this.customMessage.message });
  }

  ngOnInit() {
  }

}
