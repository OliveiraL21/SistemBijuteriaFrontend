import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from '../../../services/Produto.service';
import { UtilsRepository } from '../../../common/helpers/utilsRepository/UtilsRepository';
import Produto from '../../../models/entityModels/produtos/produto';
import { CustomButton } from '../../../models/custonsModels/CustomButtonData/CustomButton';
import { ConfirmationService, MessageService } from 'primeng/api';
import CustomSelectData from '../../../models/custonsModels/CustomSelect/CustomSelectData';
import { Cliente } from '../../../models/entityModels/cliente/Cliente';
import { ClienteService } from '../../../services/cliente.service';

interface produtoVenda {
  codigo: number;
  descricao: string;
  quantidade: number;
  valor: number
}
@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})

export class VendaComponent {
  loading: boolean = false;
  clientes: Cliente[] = [];
  produtos: produtoVenda[] = [];
  form!: FormGroup;
  subTotal: number = 0;
  desconto: number = 0;
  total: number = 0;


  constructor(private fb: FormBuilder, private produtoService: ProdutoService, private clienteService: ClienteService, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message, key: 'trv', life: 3000 });
  }

  initForm() {
    this.form = this.fb.group({
      produto: [null, null],
      clienteId: [null, null]
    })
  }

  getClientes() {
    this.clienteService.listAll().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },

      error: () => {
        this.loading = false;
      }
    })
  }

  getCustomSelect(): CustomSelectData {
    return new CustomSelectData("nome", "id", true, "name", true, "cliente", "clienteId", "Cliente", this.clientes, true);
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity);
  }

  calcularSubTotal(valorUnitario: number) {
    this.subTotal += valorUnitario;
    this.total = this.subTotal;
  }

  calcularSubtotalInput(valor: number, quantidade: number) {
    this.subTotal = (valor * quantidade);
    this.total === 0 ? this.subTotal : this.total;
  }

  calcularTotal() {
    var valorDesconto = this.subTotal * (this.desconto / 100);
    this.total = this.subTotal - valorDesconto;
  }

  delete(produto: produtoVenda) {
    this.produtos = this.produtos.filter(x => x.codigo != produto.codigo);
    this.subTotal -= (produto.valor * produto.quantidade);
    this.total = this.subTotal;
  }

  openConfirmDialog(event: Event, produto: produtoVenda) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente excluir este item?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.showMessage('success', 'Venda', 'Item excluido com sucesso');
        this.delete(produto);
      },
    });
  }

  existProduto(produto: produtoVenda) {
    if (produto) {
      var result = this.produtos.some(x => x.codigo == produto.codigo);
      return result;
    }
    return false;
  }

  getProduto() {
    this.loading = true;
    let data = this.form.value;

    if (data) {
      if (UtilsRepository.isNumberString(data.produto)) {
        this.produtoService.getByCodigo(data.produto).subscribe({
          next: (produto: Produto) => {
            let prod: produtoVenda = {
              codigo: produto.codigoProduto,
              descricao: produto.descricao,
              quantidade: 1,
              valor: produto.valorUnitario
            }
            if (this.existProduto(prod)) {
              const index = this.produtos.findIndex(x => x.codigo == prod.codigo);
              this.produtos[index].quantidade = parseInt(this.produtos[index].quantidade.toString()) + 1;
              this.calcularSubTotal(this.produtos[index].valor);
            } else {
              this.produtos = [...this.produtos, prod];
              this.calcularSubTotal(prod.valor);
            }
            this.loading = false;
            this.form.get('produto')?.reset();
          },
          error: (err: any) => {
            this.loading = false;
          }
        })
      } else {
        this.produtoService.getByNome(data).subscribe({
          next: (produto: Produto) => {

          }, error: () => {

          }
        })
      }
    }
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
  }

  finalizarVenda() {

  }
}
