import { SharedModule } from './../../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCadastroComponent } from './cadastro/user-cadastro.component';
import { UserListagemComponent } from './lista//user-listagem.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';


@NgModule({
  declarations: [
    UserCadastroComponent,
    UserListagemComponent,
    NovoUsuarioComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
