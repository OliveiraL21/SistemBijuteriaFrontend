import { Component } from '@angular/core';
import Produto from '../../../models/entityModels/produtos/produto';
import Column from '../../../models/custonsModels/CustomTable/CustomColumn';
import { ProdutoService } from '../../../services/Produto.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.scss'
})
export class ProdutoListaComponent {
  produtos: Produto[] = [];
  loading: boolean = false;

  constructor(private produtoService: ProdutoService) {

  }

  getColumnList(): Column[] {
    return [
      new Column("codigoProduto", "Código"),
      new Column("descricao", "Produto"),
      new Column("quantidade", "Quantidade"),
      new Column("valorUnitario", "Valor"),
    ]
  }

  getProdutos() {
    this.produtoService.list().subscribe({
      next: (list: Produto[]) => {
        this.loading = false;
        this.produtos = list;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  ngOnInit() {
    this.loading = true;
    this.getProdutos();
  }
}
