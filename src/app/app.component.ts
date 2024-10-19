import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bijuteria da Manu';
  authenticated: boolean = false;

  constructor(private tokenService: TokenService, private router: Router) {
  }

  onChangeRouteEvent() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(({ url }: any) => {
      const appUrl = url.split('/')[1];
      switch (appUrl) {
        case '/':
          this.authenticated = false;
          break;
        case 'login':
          this.authenticated = false;
          break;

        case 'novo-usuario':
          this.authenticated = false;
          break;

        case 'redefinirSenha':
          this.authenticated = false;
          break;


        case 'esqueceu-senha':
          this.authenticated = false;
          break;

        case '':
          this.authenticated = false;
          break;


        default:
          this.authenticated = true;
      }
    })
  }

  ngOnInit() {
    console.log(this.authenticated);
    this.onChangeRouteEvent();
  }
}
