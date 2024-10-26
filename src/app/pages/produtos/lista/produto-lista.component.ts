import { Component } from '@angular/core';
import Produto from '../../../models/entityModels/produtos/produto';
import Column from '../../../models/custonsModels/CustomTable/CustomColumn';
import { ProdutoService } from '../../../services/Produto.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.scss'
})
export class ProdutoListaComponent {
  produtos: any[] = [];
  loading: boolean = false;

  constructor(private produtoService: ProdutoService, private messageSerivce: MessageService) {

  }

  showMessage(type: string, title: string, message: string) {
    this.messageSerivce.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trlp',
      life: 3000
    })
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
        // this.produtos = list.map((produto: Produto) => ({
        //   id: produto.id,
        //   codigoProduto: produto.codigoProduto,
        //   descricao: produto.descricao,
        //   quantidade: produto.quantidade,
        //   valorUnitario: `R$ ${produto.valorUnitario.toFixed(2).toString()}`,
        //   tipoProduto: produto.tipoProduto
        // }));
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  deletarProduto(id: string) {
    this.produtoService.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.loading = false;
          this.showMessage('success', 'Produtos', 'Produto deletado com sucesso!');
          this.getProdutos();
        }
      },
      error: (err: any) => {
        this.showMessage('error', 'Produtos', `${err.error.error}`);
        this.loading = false;
      }
    })
  }

  ngOnInit() {
    this.loading = true;
    this.getProdutos();
  }
}
