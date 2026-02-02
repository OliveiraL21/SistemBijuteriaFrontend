import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaletaService } from '../../services/Maleta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private maletaSeervice: MaletaService) {

  }

  getMaletaAtual() {
    this.maletaSeervice.getMaletaAtual().subscribe(maleta => {
      console.log(maleta);
    });
  }

  ngOnInit(): void {
    this.getMaletaAtual();
  }
}
