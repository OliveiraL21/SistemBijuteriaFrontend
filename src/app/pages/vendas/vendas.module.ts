import { SharedModule } from './../../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing.module';
import { VendaComponent } from './venda/venda.component';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';
import { MaletaModule } from '../maleta/maleta.module';


@NgModule({
  declarations: [
    VendaComponent,
    ListaVendaComponent
  ],
  imports: [
    CommonModule,
    VendasRoutingModule,
    SharedModule,
    MaletaModule
  ]
})
export class VendasModule { }
