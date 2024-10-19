import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListagemClienteComponent } from './listagem-cliente/listagem-cliente.component';
import { SharedModule } from '../../common/shared/shared.module';


@NgModule({
  declarations: [
    CadastroClienteComponent,
    ListagemClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
  ]
})
export class ClienteModule { }
