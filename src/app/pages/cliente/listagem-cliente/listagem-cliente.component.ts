import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/entityModels/cliente/Cliente';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { ConfirmationService, MessageService } from 'primeng/api';
import Column from '../../../models/custonsModels/CustomTable/CustomColumn';

@Component({
  selector: 'app-listagem-cliente',
  templateUrl: './listagem-cliente.component.html',
  styleUrl: './listagem-cliente.component.scss'
})
export class ListagemClienteComponent {

  clientes: Cliente[] = [];
  loading: boolean = false;

  constructor(private router: Router, private clienteService: ClienteService, private messageService: MessageService, private confirmService: ConfirmationService) {

  }


  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trcls',
      life: 3000
    })
  }

  getClientes() {
    this.loading = true;
    this.clienteService.listAll().subscribe({
      next: (list: Cliente[]) => {
        this.loading = false;
        this.clientes = list;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getColumnList(): Column[] {
    return [
      new Column("nome", "Cliente", true),
      new Column("telefone", "Telefone"),
    ]
  }

  deletar(id: string) {
    this.clienteService.delete(id).subscribe({
      next: (response: boolean) => {
        this.loading = false;
        this.showMessage('success', 'Cliente', 'cliente excluido com sucesso');
        this.getClientes();
      },
      error: (error: any) => {
        this.loading = false;
        this.showMessage('error', 'Cliente', 'Erro ao excluir o cliente, entre em contato com o suporte do sistema')
      }
    })
  }

  ngOnInit() {
    this.getClientes();
  }
}
