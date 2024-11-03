import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from '../../../services/Produto.service';
import { UtilsRepository } from '../../../common/helpers/utilsRepository/UtilsRepository';
import Produto from '../../../models/entityModels/produtos/produto';

interface produtoVenda {
  codigo: string;
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

  getProduto() {
    let data = this.form.value;

    if (data) {
      if (UtilsRepository.isNumberString(data)) {
        this.produtoService.getByCodigo(data).subscribe({
          next: (produto: Produto) => {

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
}
