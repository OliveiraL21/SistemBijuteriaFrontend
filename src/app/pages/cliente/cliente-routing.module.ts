import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClienteComponent } from './listagem-cliente/listagem-cliente.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';


const routes: Routes = [
  {
    path: '',
    component: ListagemClienteComponent
  },
  {
    path: 'lista',
    component: ListagemClienteComponent
  },
  {
    path: 'cadastro',
    component: CadastroClienteComponent
  },
  {
    path: 'editar/:id',
    component: CadastroClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
