import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import CustomSelectData from '../../models/custonsModels/CustomSelect/CustomSelectData';
import { DropdownFilterOptions } from 'primeng/dropdown';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() form!: FormGroup;
  @Input() data!: CustomSelectData;

  filterValue: string | undefined = '';

  resetFunction(options: any[]) {
    this.filterValue = '';
  }

  customFilterFunction(event: KeyboardEvent, options: any) {
    options.filter(event);
  }

}
