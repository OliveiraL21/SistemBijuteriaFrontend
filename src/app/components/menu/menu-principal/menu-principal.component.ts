import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from '../../../services/token.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.scss'
})
export class MenuPrincipalComponent {
  items: MenuItem[] | undefined;
  username: string = "user";

  constructor(private router: Router, private tokenService: TokenService) {

  }

  minhaConta() {
    alert("Teste minha conta")
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
        routerLink: 'cliente/'

      },
      {
        label: 'Produtos',
        icon: 'pi pi-shopping-bag',
        iconClass: 'text-white',
        routerLink: 'produto/'

      },
      {
        label: 'Vendas',
        icon: 'pi pi-money-bill',
        iconClass: 'text-white',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        iconClass: 'text-white',
        command: (event: any) => {
          this.logout();
        }
      },
      {
        separator: true,
      }
    ]
    this.getUsername();
  }
}
