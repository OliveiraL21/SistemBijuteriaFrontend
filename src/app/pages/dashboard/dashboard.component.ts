import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaletaService } from '../../services/Maleta.service';
import { Maleta } from '../../models/entityModels/maleta/Maleta';
import { VendaService } from '../../services/Venda.service';
import { Venda } from '../../models/entityModels/Venda/Venda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  form!: FormGroup;
  maleta: Maleta = new Maleta();
  numberOfVendas: number = 0;
  basicOptions: any;
  basicData: any;
  vendas: any[] = [];
  vendasAtrasadas: Venda[] = [];

  constructor(private fb: FormBuilder, private maletaSeervice: MaletaService, private vendaService: VendaService, private router: Router) {

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

  getVendasByMonth() {
    this.vendaService.getByMonth().subscribe({
      next: (data) => {
        this.vendas = data.map((item: any) => item.valor);
        this.configureChartData();
      },
      error: (err) => {
        console.error('Error fetching vendas by month:', err);
      }
    });
  }

  getVendasEmAtraso() {
    this.vendaService.getVendasEmAtraso().subscribe({
      next: (vendas: Venda[]) => {
        this.vendasAtrasadas = vendas;
      }
    });
  }

  configureBasicOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  configureChartData() {
    this.basicData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Vendas',
          data: [this.vendas[0], this.vendas[1], this.vendas[2], this.vendas[3], this.vendas[4], this.vendas[5], this.vendas[6], this.vendas[7], this.vendas[8], this.vendas[9], this.vendas[10], this.vendas[11]],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    }
  }

  viewVenda(id: string) {
    this.router.navigateByUrl(`/vendas/venda/${id}`);
  }

  ngOnInit(): void {
    this.getMaletaAtual();
    this.getVendasByMonth();
    this.getVendasEmAtraso();
    this.configureBasicOptions();
  }
}
