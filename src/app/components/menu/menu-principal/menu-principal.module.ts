import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from './menu-principal.component';
import { SharedModule } from '../../../common/shared/shared.module';



@NgModule({
  declarations: [
    MenuPrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MenuPrincipalModule { }
