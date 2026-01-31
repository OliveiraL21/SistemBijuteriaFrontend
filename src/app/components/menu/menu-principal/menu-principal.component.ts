import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
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

  constructor(private router: Router, private tokenService: TokenService, private render: Renderer2, private el: ElementRef) {

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

  changeMenuItemColor() {
    const menuItems = this.el.nativeElement.querySelectorAll('.p-menuitem-link');
    const target = Array.from(menuItems as NodeListOf<HTMLElement>).find((item: HTMLElement) => item.textContent?.trim() === 'Venda');
    if (target) {
      this.render.setStyle(target, 'color', 'black'); // Exemplo de manipulação
    }
  }

  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        iconClass: 'text-white',
        routerLink: 'dashboard/',
        root: true
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        iconClass: 'text-white',
        routerLink: 'cliente/',
        root: true

      },
      {
        label: 'Maleta',
        icon: 'pi pi-briefcase',
        iconClass: 'text-white',
        routerLink: 'maleta/',
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
              label: 'Cadastro',
              root: false,
              items: [
                {
                  label: 'Venda',
                  routerLink: 'vendas/venda',
                  styleClass: 'text-500',
                  root: false,
                }
              ]
            }
          ],
          [
            {
              label: 'Lista',
              root: false,
              items: [
                {
                  label: 'Relatório de Vendas',
                  routerLink: 'vendas/relatorio',
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

  ngAfterViewInit() {
    this.changeMenuItemColor();

  }
}
