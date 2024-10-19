import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/entityModels/cliente/Cliente';

@Component({
  selector: 'app-listagem-cliente',
  templateUrl: './listagem-cliente.component.html',
  styleUrl: './listagem-cliente.component.scss'
})
export class ListagemClienteComponent {

  clientes: Cliente[] = [];
  loading: boolean = false;

  constructor(private router: Router, private clienteService: ClienteService,) {

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

  ngOnInit() {
    this.getClientes();
  }
}
