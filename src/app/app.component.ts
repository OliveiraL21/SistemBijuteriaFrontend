import { Component } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bijuteria da Manu';
  authenticated: boolean = false;

  constructor(private tokenService: TokenService) {
    this.authenticated = this.tokenService.possuiToken();
  }

  ngOnInit() {
    console.log(this.authenticated)
  }
}
