import { MaletaService } from './../../../services/Maleta.service';
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

  constructor(private service: MaletaService, private router: Router, private activeRoute: ActivatedRoute, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getMaletas();

  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
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
      new Column('status$descricao', 'Status', false)
    ]
  }

  getMaletas() {
    this.loading = true;
    this.service.list().subscribe({
      next: (list: Maleta[]) => {
        this.lisOfMaletas = list;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  deletar(id: string) {
    this.service.deletar(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.showMessage('success', 'Maleta', 'Registro excluido com sucesso!');
        } else {
          this.showMessage('error', 'Maleta', 'Erro ao excluir o registro, tente novamente mais tarde');
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }
}
