import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-file',
  templateUrl: './custom-file.component.html',
  styleUrl: './custom-file.component.scss'
})
export class CustomFileComponent {
  file!: any;
  @Output() FileEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  upload(event: any) {
    if (event.currentFiles) {
      this.file = event.currentFiles[0];
      this.FileEventEmitter.emit(this.file);
    }
  }

  clear() {
    this.file = null;
  }
}
