import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaletaListagemComponent } from './maleta-listagem/maleta-listagem.component';
import { MaletaCadastroComponent } from './maleta-cadastro/maleta-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: MaletaListagemComponent
  },
  {
    path: 'listagem',
    component: MaletaListagemComponent
  },
  {
    path: 'cadastro',
    component: MaletaCadastroComponent
  },
  {
    path: 'editar/:id',
    component: MaletaCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaletaRoutingModule { }
