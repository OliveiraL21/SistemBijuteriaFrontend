import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { Router } from '@angular/router';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.onInitForm();
  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('nome', 'Informe o nome do cliente', 'nome', 'Nome', 'nome', false)
      },
      {
        type: 'text',
        data: new CustomInputText('cpf', 'Informe o cpf', 'cpf', 'Cpf', 'cpf', false)
      },
      {
        type: 'text',
        data: new CustomInputText('telefone', 'Informe o telefone', 'telefone', 'Telefone', 'telefone', false)
      }
    ]
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity);
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

  ngOnIniti() {

  }
}
