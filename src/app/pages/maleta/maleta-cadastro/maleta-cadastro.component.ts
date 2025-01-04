import { Component } from '@angular/core';
import { MaletaService } from '../../../services/Maleta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import CustomSelectData from '../../../models/custonsModels/CustomSelect/CustomSelectData';
import { Maleta } from '../../../models/entityModels/maleta/Maleta';
import { StatusService } from '../../../services/Status.service';
import { Status } from '../../../models/entityModels/status/Status';

@Component({
  selector: 'app-maleta-cadastro',
  templateUrl: './maleta-cadastro.component.html',
  styleUrl: './maleta-cadastro.component.scss'
})
export class MaletaCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;
  id: string | null = null;
  status: Status[] = [];
  constructor(private service: MaletaService, private router: Router, private activeRoute: ActivatedRoute, private messageService: MessageService, private fb: FormBuilder, private statusService: StatusService) {
    this.id = this.activeRoute.snapshot.paramMap.get('id') ?? null;
  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('troca', 'Informe a data de troca da maleta', 'troca', 'Data de Troca', 'troca', false, true, '99/99/9999')
      },
      {
        type: 'text',
        data: new CustomInputText('envio', 'Informe a data de envio', 'envio', 'Data de Envio', 'envio', false, true, '99/99/9999')
      },
      {
        type: 'text',
        data: new CustomInputText('pagamento', 'Informe a data do pagamento', 'pagamento', 'Data de Pagamento', 'pagamento', false, true, '99/99/9999')
      },
      {
        type: 'text',
        data: new CustomInputText('numero', 'Informe o número da maleta', 'numero', 'Número da Maleta', 'numero', false, true, '')
      },
      {
        type: 'select',
        data: new CustomSelectData('descricao', 'id', false, 'descricao', true, 'Selecione um status', 'status', 'Status', this.status, true)
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

  getStatus() {
    this.statusService.listAll().subscribe({
      next: (response: Status[]) => {
        this.status = response;
        this.loading = false;
      }, error: (err: any) => {
        this.loading = false;
      }
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
    this.getStatus();
  }

  voltar() {
    this.router.navigateByUrl('maleta/listagem');
  }

  createPayload() {
    let data = this.form.getRawValue();
    let maleta: Maleta = {
      id: this.id ?? null,
      Envio: data.envio,
      Pagamento: data.pagamento,
      Troca: data.troca,
      numero: data.numero,
      status: data.status
    }

    return maleta;
  }

  createMaleta(payload: Maleta) {
    this.service.create(payload)?.subscribe({
      next: (response: Maleta) => {
        this.showMessage('success', 'Maleta', 'Registro cadastrado com sucesso!');
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  editarMaleta(payload: Maleta) {
    this.service.update(this.id ?? "", payload)?.subscribe({
      next: (response: Maleta) => {
        this.showMessage('success', 'Maleta', 'Registro atualizado com sucesso!');
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  submit() {
    this.loading = true;
    let payload = this.createPayload();
    if (!this.id) {
      this.createMaleta(payload);
    } else {
      this.editarMaleta(payload)
    }
  }

}
