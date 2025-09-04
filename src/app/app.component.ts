import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './services/user.service';
import Usuario from './models/entityModels/usuario/Usuario';
import { UtilsRepository } from './common/helpers/utilsRepository/UtilsRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bijuteria da Manu';
  authenticated: boolean = false;
  profilePhoto: any;

  constructor(private tokenService: TokenService, private router: Router, private userService: UserService) {
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

        case 'usuario':
          this.authenticated = url.split('/')[2] === 'novo-usuario' ? false : this.tokenService.possuiToken();
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
          this.setUserProfilePhoto();
      }
    })
  }

  getUser() {
    if (this.tokenService.possuiToken()) {
      this.userService.findByUsername(this.tokenService.getItem('username') ?? '').subscribe({
        next: (user: Usuario) => {
          this.profilePhoto = user.foto;
        }
      })
    }
  }


  setUserProfilePhoto() {
    this.profilePhoto = this.tokenService.getItem('photo');
  }

  ngOnInit() {
    this.onChangeRouteEvent();
  }
}
