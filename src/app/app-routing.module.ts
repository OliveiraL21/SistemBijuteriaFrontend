import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'cliente', loadChildren: () => import('./pages/cliente/cliente.module').then((m) => m.ClienteModule),
  },
  {
    path: 'produto', loadChildren: () => import('./pages/produtos/produto.module').then((m) => m.ProdutoModule),
  },
  {
    path: 'usuario', loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
