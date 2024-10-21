import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/entityModels/cliente/Cliente';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { ConfirmationService, MessageService } from 'primeng/api';

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


  getCustomButton(): CustomButton {
    return new CustomButton('Novo Cliente', false, '', 'primary');
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

  novo() {
    this.router.navigateByUrl('cliente/cadastro');
  }

  editar(id: string) {
    this.router.navigateByUrl(`cliente/editar/${id}`);
  }

  openDialog(event: Event, id: string) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja excluir este item?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.loading = true;
        this.deletar(id);

      },
      reject: () => {

      }

    })
  }

  deletar(id: string) {
    this.clienteService.delete(id).subscribe({
      next: (response: boolean) => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Cliente', detail: 'Cliente deletado com sucesso !' });
        this.getClientes();
      },
      error: (error: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Cliente', detail: 'Erro ao deletar o cliente, entre em contato com o suporte do sistema' });
      }
    })
  }

  ngOnInit() {
    this.getClientes();
  }
}
