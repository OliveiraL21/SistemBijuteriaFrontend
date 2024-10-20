import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/entityModels/cliente/Cliente';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';

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

  ngOnInit() {
    this.getClientes();
  }
}
