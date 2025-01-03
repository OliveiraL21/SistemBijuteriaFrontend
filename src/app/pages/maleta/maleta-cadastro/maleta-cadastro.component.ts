import { Component } from '@angular/core';
import { MaletaService } from '../../../services/Maleta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import CustomSelectData from '../../../models/custonsModels/CustomSelect/CustomSelectData';

@Component({
  selector: 'app-maleta-cadastro',
  templateUrl: './maleta-cadastro.component.html',
  styleUrl: './maleta-cadastro.component.scss'
})
export class MaletaCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;

  constructor(private service: MaletaService, private router: Router, private activeRoute: ActivatedRoute, private messageService: MessageService, private fb: FormBuilder) {

  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('troca', 'Informe a data de troca da maleta', 'troca', 'Data de Troca', 'troca', false, true, '00/00/0000')
      },
      {
        type: 'text',
        data: new CustomInputText('envio', 'Informe a data de envio', 'envio', 'Data de Envio', 'envio', false, true, '00/00/0000')
      },
      {
        type: 'text',
        data: new CustomInputText('pagamento', 'Informe a data do pagamento', 'pagamento', 'Data de Pagamento', 'pagamento', false, true, '00/00/0000')
      },
      {
        type: 'text',
        data: new CustomInputText('numero', 'Informe o número da maleta', 'numero', 'Número da Maleta', 'numero', false, true, '')
      },
      {
        type: 'select',
        data: new CustomSelectData('descricao', 'id', false, 'descricao', true, 'Selecione um status', 'status', 'Status', [], true)
      }
    ]
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trlccm',
      life: 3000
    })
  }

  initForm() {
    this.form = this.fb.group({
      troca: [null, [Validators.required]],
      envio: [null, [Validators.required]],
      pagamento: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      status: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.initForm();
  }

  voltar() {
    this.router.navigateByUrl('maleta/listagem');
  }

  submit() {

  }

}
