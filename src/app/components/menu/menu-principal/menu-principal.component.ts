import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { TokenService } from '../../../services/token.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.scss'
})
export class MenuPrincipalComponent {
  items: MegaMenuItem[] | undefined;
  username: string = "user";
  @Input() userPhoto!: any;

  constructor(private router: Router, private tokenService: TokenService) {

  }

  minhaConta() {
    this.router.navigateByUrl('usuario/minhaConta');
  }

  getUsername() {
    this.username = this.tokenService.getItem('username') ?? "user";
  }

  logout() {
    this.tokenService.clearStorage();
    this.router.navigateByUrl('login');
  }

  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        iconClass: 'text-white',
        routerLink: 'cliente/',
        root: true

      },
      {
        label: 'Produtos',
        icon: 'pi pi-shopping-bag',
        iconClass: 'text-white bg-white',
        routerLink: 'produto/',
        root: true
      },
      {
        label: 'Vendas',
        icon: 'pi pi-money-bill',
        iconClass: 'text-white',
        root: true,
        items: [
          [
            {
              label: 'Lista',
              items: [
                {
                  label: 'Venda',
                  routerLink: 'vendas/venda',
                  styleClass: 'text-500',
                  style: { 'color': '#000' }
                }
              ]
            }
          ],
          [
            {
              label: 'Cadastro',
              items: [
                {
                  label: 'Relatório de Vendas',
                  routerLink: 'vendas/vendas',
                }
              ]
            }

          ]
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        iconClass: 'text-white',
        command: (event: any) => {
          this.logout();
        },
        root: true
      },
      {
        separator: true,
      }
    ]
    this.getUsername();
  }
}
