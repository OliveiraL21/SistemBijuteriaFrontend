import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';
import { VendaComponent } from './venda/venda.component';

const routes: Routes = [
  {
    path: '',
    component: ListaVendaComponent
  },
  {
    path: 'relatorio',
    component: ListaVendaComponent,
  },
  {
    path: 'venda',
    component: VendaComponent
  },
  {
    path: 'venda/:id',
    component: VendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
