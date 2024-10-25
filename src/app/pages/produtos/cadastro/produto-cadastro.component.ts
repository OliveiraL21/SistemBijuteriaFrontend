import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormControls } from '../../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomInputText } from '../../../models/custonsModels/CustomTextInputData/CustomInputText';
import CustomInputNumberData from '../../../models/custonsModels/customInputNumberData/CustomInputNumberData';
import CustomSelectData from '../../../models/custonsModels/CustomSelect/CustomSelectData';
import { TipoProdutoService } from '../../../services/TipoProduto.service';
import TipoProduto from '../../../models/entityModels/tipoProduto/tipoProduto';
import { UtilsRepository } from '../../../common/helpers/utilsRepository/UtilsRepository';
import { MessageService } from 'primeng/api';
import CreateProduto from '../../../models/entityModels/produtos/CreateProduto';
import { ProdutoService } from '../../../services/Produto.service';
import Produto from '../../../models/entityModels/produtos/produto';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;
  tiposProdutos: TipoProduto[] = [];
  id?: string;

  constructor(private fb: FormBuilder, private router: Router, private service: ProdutoService, private tipoProdutoService: TipoProdutoService, private messageService: MessageService, private activeRoute: ActivatedRoute) {

  }

  showMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message, key: 'trp', life: 3000 });
  }

  getFormControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('codigoProduto', 'Informe o código do produto', 'codigoProduto', 'Código do Produto', 'codigoProduto', false, true, "")
      },
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
        data: new CustomSelectData('descricao', 'id', true, 'descricao', true, 'Selecione o tipo do produto', 'tipoProdutoId', 'Tipo Produto', this.tiposProdutos, true)
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
      codigoProduto: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valorUnitario: [null, [Validators.required]],
      tipoProdutoId: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') ?? undefined;
    this.initForm();
    this.getTipoProduto();
  }

  voltar() {
    this.router.navigateByUrl('produto/lista');
  }

  createProduto() {
    let produto: CreateProduto;
    produto = this.form.value;
    produto.valorUnitario = UtilsRepository.convertToDouble(produto.valorUnitario.toString());
    produto.quantidade = UtilsRepository.convertToDouble(produto.quantidade.toString());

    this.service.create(produto).subscribe({
      next: (produto: Produto) => {
        this.loading = false;
        this.showMessage("success", "Produto", "Produto cadastrado com sucesso");
        this.router.navigateByUrl('produto/lista');
      },
      error: (error: any) => {
        this.loading = false;
      }
    })
  }

  submit() {
    this.loading = true;
    if (this.form.valid) {
      if (!this.id) {
        this.createProduto();
      }
    } else {
      UtilsRepository.getRequiredFieldsInvalid(this.form);
      this.showMessage('error', 'Produtos', 'Por favor preencha todos os campos obrigatórios');
      this.loading = false;
    }
  }
}
