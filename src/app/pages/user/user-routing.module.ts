import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCadastroComponent } from './cadastro/user-cadastro.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  {
    path: 'minhaConta',
    component: UserCadastroComponent
  }, {
    path: 'novo-usuario',
    component: NovoUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
