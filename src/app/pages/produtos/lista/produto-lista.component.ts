import { Component } from '@angular/core';
import Produto from '../../../models/entityModels/produtos/produto';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.scss'
})
export class ProdutoListaComponent {
  openDialog($event: MouseEvent, arg1: any) {
    throw new Error('Method not implemented.');
  }
  editar(arg0: any) {
    throw new Error('Method not implemented.');
  }
  novo() {
    throw new Error('Method not implemented.');
  }
  getCustomButton(): import("../../../models/custonsModels/CustomButtonData/CustomButton").CustomButton {
    throw new Error('Method not implemented.');
  }
  produtos: Produto[] = [];
  loading: boolean = false;

  constructor() {

  }
}
