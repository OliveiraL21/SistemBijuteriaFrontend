import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrl: './menu-superior.component.scss'
})

export class MenuSuperiorComponent {
  @Input() userPhoto: any;
  @Input() username: string = '';

  ngOnInit() {
    console.log(this.username);
  }
}
