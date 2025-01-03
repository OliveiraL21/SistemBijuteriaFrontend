import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaletaRoutingModule } from './maleta-routing.module';
import { MaletaCadastroComponent } from './maleta-cadastro/maleta-cadastro.component';
import { MaletaListagemComponent } from './maleta-listagem/maleta-listagem.component';
import { SharedModule } from '../../common/shared/shared.module';


@NgModule({
  declarations: [
    MaletaListagemComponent,
    MaletaCadastroComponent,
  ],
  imports: [
    CommonModule,
    MaletaRoutingModule,
    SharedModule
  ]
})
export class MaletaModule { }
