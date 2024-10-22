import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoListaComponent } from './lista/produto-lista.component';
import { ProdutoCadastroComponent } from './cadastro/produto-cadastro.component';
import { SharedModule } from '../../common/shared/shared.module';


@NgModule({
  declarations: [
    ProdutoListaComponent,
    ProdutoCadastroComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule
  ]
})
export class ProdutoModule { }
