import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { Router } from '@angular/router';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import CustomInputNumberData from '../../../models/custonsModels/customInputNumberData/CustomInputNumberData';
import CustomSelectData from '../../../models/custonsModels/CustomSelect/CustomSelectData';
import { TipoProdutoService } from '../../../services/TipoProduto.service';
import TipoProduto from '../../../models/entityModels/tipoProduto/tipoProduto';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;
  tiposProdutos: TipoProduto[] = [];

  constructor(private fb: FormBuilder, private router: Router, private tipoProdutoService: TipoProdutoService) {

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
        data: new CustomInputNumberData('valorUnitario', 'Valor Unitário', 'valorUnitario ', 'currency', true)
      },
      {
        type: 'select',
        data: new CustomSelectData('descricao', 'id', true, 'descricao', true, 'Selecione o tipo do produto', 'tipoProduto', 'Tipo Produto', this.tiposProdutos, true)
      }
    ]
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity);
  }

  getTipoProduto() {
    this.tipoProdutoService.list().subscribe({
      next: (list: TipoProduto[]) => {
        this.tiposProdutos = list;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
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
    this.getTipoProduto();
  }

  voltar() {
    this.router.navigateByUrl('produto/lista');
  }

  submit() {
    console.log(this.form.value);
  }
}
