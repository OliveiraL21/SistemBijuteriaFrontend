import { Component } from '@angular/core';
import Column from '../../../models/custonsModels/CustomTable/CustomColumn';
import { VendaService } from '../../../services/Venda.service';
import { MessageService } from 'primeng/api';
import { Venda } from '../../../models/entityModels/Venda/Venda';

@Component({
  selector: 'app-lista-venda',
  templateUrl: './lista-venda.component.html',
  styleUrl: './lista-venda.component.scss'
})
export class ListaVendaComponent {

  vendas: any[] = [];
  loading: boolean = false;

  constructor(private service: VendaService, private messageSerivce: MessageService) {

  }


  showMessage(type: string, title: string, message: string) {
    this.messageSerivce.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trlrv',
      life: 3000
    })
  }

  getColumnList(): Column[] {
    return [
      new Column("cliente$nome", "Cliente", true),
      new Column("data", "Data", true),
      new Column("total", "Total"),
      new Column('status$descricao', 'Status')
    ]
  }

  convertToDate(data: any) {
    if (data) {
      let d = new Date(data).toLocaleDateString().split('/');
      let year = d[2];
      let month = d[1];
      let day = d[0];

      return `${day}/${month}/${year}`;
    }
    return '-'
  }

  getVendas() {
    this.service.listAll().subscribe({
      next: (venda: Venda[]) => {
        this.vendas = venda;
        this.vendas = this.vendas.map((v: Venda) => ({
          ...v,
          data: this.convertToDate(v.data)
        }))
        this.loading = false;
      }, error: () => {
        this.loading = false;
      }
    })
  }

  deletar(id: string) {
    this.service.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.loading = false;
          this.showMessage('success', 'Produtos', 'Produto deletado com sucesso!');
          this.getVendas();
        }
      }, error: (err: any) => {

      }
    })
  }

  ngOnInit() {
    this.getVendas();
  }

}
