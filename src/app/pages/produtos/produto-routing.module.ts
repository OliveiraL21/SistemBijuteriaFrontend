import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListaComponent } from './lista/produto-lista.component';
import { ProdutoCadastroComponent } from './cadastro/produto-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutoListaComponent
  },
  {
    path: 'lista',
    component: ProdutoListaComponent
  },
  {
    path: 'cadastro',
    component: ProdutoCadastroComponent
  },
  {
    path: 'editar/:id',
    component: ProdutoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
