import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrl: './menu-superior.component.scss'
})

export class MenuSuperiorComponent {
  @Input() userPhoto: any;
  username: string = "";


  constructor(private route: Router) {

  }

  myAccount() {
    this.route.navigateByUrl('usuario/minhaConta');
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? "";
    console.log(this.username);
  }
}
