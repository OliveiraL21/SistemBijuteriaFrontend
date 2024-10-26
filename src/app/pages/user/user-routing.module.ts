import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCadastroComponent } from './cadastro/user-cadastro.component';

const routes: Routes = [
  {
    path: 'minhaConta/:id',
    component: UserCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
