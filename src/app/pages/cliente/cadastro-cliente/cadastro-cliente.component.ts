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

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  form!: FormGroup;
  loading: boolean = false;
  id: string;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private clienteService: ClienteService, private activeRoute: ActivatedRoute) {
    this.onInitForm();
    this.id = this.activeRoute.snapshot.paramMap.get('id') ?? "";
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
        type: 'text',
        data: new CustomInputText('telefone', 'Informe o telefone', 'telefone', 'Telefone', 'telefone', false, true, "(99) - 99999-9999")
      }
    ]
  }

  // getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
  //   return new CustomButton(label, rounded, styles, severity);
  // }

  getCliente() {
    if (this.id) {
      this.clienteService.details(this.id).subscribe({
        next: (response: Cliente) => {
          this.loading = false;
          Object.keys(response).forEach((key: string) => {
            this.form.get(key)?.setValue(response[key as keyof Cliente]);
          })
        }
      })
    }
  }

  onInitForm(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, null],
      telefone: [null, [Validators.required]]
    })
  }

  voltar() {
    this.router.navigateByUrl('cliente/lista');
  }

  createCliente(): void {
    let cliente: CreateCliente;
    cliente = this.form.value;
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
