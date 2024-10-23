import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { Router } from '@angular/router';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import CustomInputNumberData from '../../../models/custonsModels/customInputNumberData/CustomInputNumberData';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('descricao', 'Informe o nome do produto', 'descricao', 'Produto', 'descricao', false, true, "")
      },
      {
        type: 'text',
        data: new CustomInputText('quantidade', "Informe a quantidade", "quantidade", "Quantidade", "quantidade", false, true, ""),
      },
      {
        type: 'text',
        data: new CustomInputNumberData('valorUnitario', 'Valor Unitário', 'valorUnitario ', 'currency', false)
      }
    ]
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity);
  }

  initForm() {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valorUnitario: [null, [Validators.required]],
      tipoProduto: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.initForm();
  }

  voltar() {
    this.router.navigateByUrl('produto/lista');
  }

  submit() {

  }
}
