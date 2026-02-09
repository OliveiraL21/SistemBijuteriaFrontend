import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { UtilsRepository } from '../../../common/helpers/utilsRepository/UtilsRepository';
import { MessageService } from 'primeng/api';
import { ClienteService } from '../../../services/cliente.service';
import { CreateCliente } from '../../../models/entityModels/cliente/CreateCliente';
import { Cliente } from '../../../models/entityModels/cliente/Cliente';
import CustomSelectData from '../../../models/custonsModels/CustomSelect/CustomSelectData';

interface TipoContato {
  label: string;
  value: string;
}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  form!: FormGroup;
  loading: boolean = false;
  id: string;
  telefoneMask: string = "(99) 99999-9999";
  tiposContato: TipoContato[] = [
    { label: 'Celular', value: 'celular' },
    { label: 'Fixo', value: 'fixo' },
  ];
  isCelular: boolean = false;
  isFixo: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private clienteService: ClienteService, private activeRoute: ActivatedRoute) {
    this.onInitForm();
    this.id = this.activeRoute.snapshot.paramMap.get('id') ?? "";
    this.telefoneMask = "(99) 99999-9999";
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trccl',
      life: 3000
    })
  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('nome', 'Informe o nome do cliente', 'nome', 'Nome', 'nome', false, true, "")
      },
      {
        type: 'text',
        data: new CustomInputText('cpf', 'Informe o cpf', 'cpf', 'Cpf', 'cpf', false, false, "999.999.999-99")
      },
      {
        type: 'select',
        data: new CustomSelectData('label', 'value', false, '', true, 'Selecione o tipo de contato', 'tipoContato', 'Tipo de Contato', this.tiposContato, true)
      },
      {
        type: 'text',
        data: new CustomInputText('celular', 'Informe o telefone celular', 'celular', 'Celular', 'celular', false, true, this.telefoneMask, this.isCelular)
      },

      {
        type: 'text',
        data: new CustomInputText('telefone', 'Informe o telefone', 'telefone', 'Telefone', 'telefone', false, true, this.telefoneMask, this.isFixo)
      }
    ]
  }

  verificarTipoDeTelefone(telefone: string) {
    const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const fixoRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
    if (!telefone) {
      if (celularRegex.test(telefone)) {
        return 'celular';
      }
      if (fixoRegex.test(telefone)) {
        return 'fixo';
      }
    }
    return 'fixo';
  }

  getCliente() {
    if (this.id) {
      this.clienteService.details(this.id).subscribe({
        next: (response: Cliente) => {
          this.loading = false;
          Object.keys(response).forEach((key: string) => {
            if (this.verificarTipoDeTelefone(response.telefone) === 'celular') {
              this.onTipoContatoChange('celular');
              this.form.get('tipoContato')?.setValue('celular');
            } else {
              this.onTipoContatoChange('fixo');
              this.form.get('tipoContato')?.setValue('fixo');
            }
            this.form.get(key)?.setValue(response[key as keyof Cliente]);
          })
        }
      })
    }
  }

  onTipoContatoChange(tipo: string) {
    if (tipo === 'celular') {
      this.telefoneMask = "(99) 99999-9999";
      this.isCelular = true;
      this.isFixo = false;
      this.form.get('telefone')?.setValidators(null);
      this.form.get('telefone')?.updateValueAndValidity();
      this.form.get('celular')?.setValidators([Validators.required]);
      this.form.get('celular')?.updateValueAndValidity();
      this.form.get('telefone')?.setValue(null);
    } else if (tipo === 'fixo') {
      this.telefoneMask = "(99) 9999-9999";
      this.isCelular = false;
      this.isFixo = true;
      this.form.get('celular')?.setValidators(null);
      this.form.get('celular')?.updateValueAndValidity();
      this.form.get('telefone')?.setValidators([Validators.required]);
      this.form.get('telefone')?.updateValueAndValidity();
      this.form.get('celular')?.setValue(null);
    }
  }


  onInitForm(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, null],
      telefone: [null, [Validators.required]],
      tipoContato: [null, [Validators.required]],
      celular: [null, [Validators.required]],
    })
  }

  voltar() {
    this.router.navigateByUrl('cliente/lista');
  }

  createCliente(): void {
    let cliente: CreateCliente;
    cliente = this.form.value;
    cliente.telefone = this.form.value.celular ?? this.form.value.telefone;
    this.clienteService.create(cliente).subscribe({
      next: (response: Cliente) => {
        this.loading = false;
        this.showMessage('success', 'Cliente', 'Cliente cadastrado com sucesso !')
        this.router.navigateByUrl('cliente/lista');
      },
      error: (error: any) => {
        this.loading = false;

      }
    })
  }

  updateCliente() {
    let cliente: Cliente;
    cliente = this.form.value;
    cliente.telefone = this.form.value.celular ?? this.form.value.telefone;
    cliente.id = this.id;
    this.clienteService.update(this.id, cliente).subscribe({
      next: (cliente: Cliente) => {
        this.loading = false;
        this.showMessage('success', 'Cliente', 'Cliente atualizado com sucesso !')
        this.router.navigateByUrl('cliente/lista');

      }, error: (error: any) => {
        this.loading = false;

      }
    })
  }

  submit(): void {
    this.loading = true;
    if (this.form.valid) {
      if (this.id === "") {
        this.createCliente();
      } else {
        this.updateCliente();
      }
    } else {
      this.showMessage('error', 'Error', 'Por favor preencha todos os campos obrigatórios');
      UtilsRepository.getRequiredFieldsInvalid(this.form);
      this.loading = false;
    }
  }

  ngOnInit() {
    this.getCliente();
  }
}
