import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from '../../../services/Produto.service';
import { UtilsRepository } from '../../../common/helpers/utilsRepository/UtilsRepository';
import Produto from '../../../models/entityModels/produtos/produto';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';

interface produtoVenda {
  codigo: number;
  descricao: string;
  quantidade: number;
  valor: number
}
@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})

export class VendaComponent {
  loading: boolean = false;
  produtos: produtoVenda[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {

  }

  initForm() {
    this.form = this.fb.group({
      produto: [null, null]
    })
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity);
  }

  getProduto() {
    let data = this.form.value;

    if (data) {
      if (UtilsRepository.isNumberString(data.produto)) {
        this.produtoService.getByCodigo(data.produto).subscribe({
          next: (produto: Produto) => {
            let prod: produtoVenda = {
              codigo: produto.codigoProduto,
              descricao: produto.descricao,
              quantidade: 0,
              valor: produto.valorUnitario
            }
            this.produtos = [...this.produtos, prod]
          },
          error: (err: any) => {

          }
        })
      } else {
        this.produtoService.getByNome(data).subscribe({
          next: (produto: Produto) => {

          }, error: () => {

          }
        })
      }
    }
  }

  ngOnInit() {
    this.initForm();
  }
}
