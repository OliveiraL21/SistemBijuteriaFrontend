import { Component } from '@angular/core';
import Column from '../../../models/custonsModels/CustomTable/CustomColumn';
import { Maleta } from '../../../models/entityModels/maleta/Maleta';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-maleta-listagem',
  templateUrl: './maleta-listagem.component.html',
  styleUrl: './maleta-listagem.component.scss'
})
export class MaletaListagemComponent {

  lisOfMaletas: Maleta[] = [];
  loading: boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private messageSerivce: MessageService) {

  }

  ngOnInit() {
    this.getMaletas();

  }

  showMessage(type: string, title: string, message: string) {
    this.messageSerivce.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trlcm',
      life: 3000
    })
  }

  getCustomColumns(): Column[] {
    return [
      new Column('numero', 'Número', true),
      new Column('troca', 'Data da Troca', false),
      new Column('envio', 'Data de Envio', true),
      new Column('pagamento', 'Data de Pagamento', true),
    ]
  }

  getMaletas() {

  }

  deletar() {
    throw new Error('Method not implemented.');
  }
}
