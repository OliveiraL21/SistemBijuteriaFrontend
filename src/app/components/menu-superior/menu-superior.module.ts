import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSuperiorComponent } from './menu-superior.component';
import { SharedModule } from '../../common/shared/shared.module';



@NgModule({
  declarations: [
    MenuSuperiorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MenuSuperiorComponent
  ]
})
export class MenuSuperiorModule { }
