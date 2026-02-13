import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../services/notificacao.service';
import { Notificacao } from '../../models/entityModels/notificacao/notificacao';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrl: './menu-superior.component.scss'
})

export class MenuSuperiorComponent {
  @Input() userPhoto: any;
  username: string = "";
  badgeCount: number = 0;
  intervalo: any;
  notificacoes: Notificacao[] = [];


  constructor(private route: Router, private notificacaoService: NotificacaoService) {

  }

  myAccount() {
    this.route.navigateByUrl('usuario/minhaConta');
  }

  getNotificacoes() {
    this.notificacaoService.pendentes().subscribe({
      next: (data) => {
        this.badgeCount = data.length;
        this.notificacoes = data;
      }
    });
  }

  lerNotificacao(notificacao: Notificacao) {
    this.notificacaoService.marcarComoLida(notificacao.id).subscribe({
      next: (data) => {
        this.notificacoes = this.notificacoes.filter((n: Notificacao) => n.id !== notificacao.id);
        this.badgeCount = this.notificacoes.length;
      }
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? "";
    this.intervalo = setInterval(() => this.getNotificacoes(), 6000);
  }

  ngOnDestroy() {
    // Limpa o intervalo quando sair da tela para não pesar a memória
    if (this.intervalo) clearInterval(this.intervalo);
  }
}
