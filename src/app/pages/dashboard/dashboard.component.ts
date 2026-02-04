import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaletaService } from '../../services/Maleta.service';
import { Maleta } from '../../models/entityModels/maleta/Maleta';
import { VendaService } from '../../services/Venda.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  form!: FormGroup;
  maleta: Maleta = new Maleta();
  numberOfVendas: number = 0;

  constructor(private fb: FormBuilder, private maletaSeervice: MaletaService, private vendaService: VendaService) {

  }

  getMaletaAtual() {
    this.maletaSeervice.getMaletaAtual().subscribe(maleta => {
      this.maleta = maleta;
      this.maleta.Envio = new Date(maleta.envio.split('/')[2], maleta.envio.split('/')[1] - 1, maleta.envio.split('/')[0]);
      this.maleta.Pagamento = new Date(maleta.pagamento.split('/')[2], maleta.pagamento.split('/')[1] - 1, maleta.pagamento.split('/')[0]);
      this.maleta.Troca = new Date(maleta.troca.split('/')[2], maleta.troca.split('/')[1] - 1, maleta.troca.split('/')[0]);
      this.getNumberOfVendas();
    });
  }

  getNumberOfVendas() {
    return this.vendaService.getNumberOfSellsByBriefcase(this.maleta.id ?? "").subscribe({
      next: (number) => {
        this.numberOfVendas = number;
      },
      error: (err) => {
        console.error('Error fetching number of vendas:', err);
      }
    });
  }

  ngOnInit(): void {
    this.getMaletaAtual();
  }
}
