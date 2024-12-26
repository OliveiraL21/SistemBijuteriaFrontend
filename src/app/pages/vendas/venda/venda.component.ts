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
import { VendaService } from '../../../services/Venda.service';
import { Venda } from '../../../models/entityModels/Venda/Venda';
import { StatusService } from '../../../services/Status.service';
import { Status } from '../../../models/entityModels/status/Status';
import { ActivatedRoute } from '@angular/router';

interface produtoVenda {
  id: string,
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
  modalProdutosVisible: boolean = false;
  selectedModalProduct?: produtoVenda;
  modalProducts: produtoVenda[] = [];
  buttonSearchDisable: boolean = false;
  status: Status[] = [];
  id: string = "";


  constructor(private fb: FormBuilder, private service: VendaService, private produtoService: ProdutoService, private clienteService: ClienteService, private confirmationService: ConfirmationService, private messageService: MessageService, private statusService: StatusService, private activeRouter: ActivatedRoute) {
    this.id = this.activeRouter.snapshot.paramMap.get('id') ?? "";
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message, key: 'trv', life: 3000 });
  }

  initForm() {
    this.form = this.fb.group({
      produto: [null, null],
      clienteId: [null, null],
      status: [null, null]
    });
  }


  getVenda() {
    if (this.id) {
      this.loading = true;
      this.service.detail(this.id).subscribe({
        next: (venda: any) => {
          this.total = venda.total;
          this.subTotal = venda.subtotal;
          console.log(venda);
          this.desconto = venda.desconto;
          this.produtos = venda.produtos.map((produto: any) => ({
            id: produto.id ?? '',
            codigo: produto.codigo,
            descricao: produto.descricao,
            quantidade: produto.quantidadeComprada,
            valor: produto.valor,
          }));
          this.form.get('clienteId')?.enable();
          this.form.get('clienteId')?.setValue(venda.cliente.id);
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
        }
      })
    }
  }

  getStatus() {
    this.statusService.listAll().subscribe({
      next: (response: Status[]) => {
        this.status = response;
      },
      error: (err: any) => {
        this.loading = false;
      }
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

  getCustomSelect(optionLabel: string, optionValue: string, filter: boolean, filterBy: string, showClear: boolean, placeholder: string, controlName: string, label: string, list: any, required: boolean): CustomSelectData {
    return new CustomSelectData(optionLabel, optionValue, filter, filterBy, showClear, placeholder, controlName, label, list, required);
  }

  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity, "");
  }

  calcularSubTotal(valorUnitario: number) {
    this.subTotal += valorUnitario;
    this.total = this.subTotal;
  }

  calcularSubtotalInput(valor: number, quantidade: number) {
    if (!quantidade) {
      this.subTotal = 0;
      this.total = this.subTotal;
    } else {
      // this.subTotal = (valor * quantidade);
      this.subTotal = 0;
      this.subTotal = this.produtos.reduce((acumulator: number, currentValue: produtoVenda) => acumulator + (currentValue.valor * currentValue.quantidade), this.subTotal);
      this.total = this.subTotal;
    }

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

  onKeypressProduto(key: any) {
    if (key.keyCode === 13) {
      this.getProduto();
    }
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

  setProduto(produto: produtoVenda) {
    if (this.existProduto(produto)) {
      const index = this.produtos.findIndex(x => x.codigo == produto.codigo);
      this.produtos[index].quantidade = parseInt(this.produtos[index].quantidade.toString()) + 1;
      this.calcularSubTotal(this.produtos[index].valor);
    } else {
      this.produtos = [...this.produtos, produto];
      this.calcularSubTotal(produto.valor);
    }
  }

  closeModalProdutos() {
    this.modalProdutosVisible = false;
  }

  getProduto() {
    this.loading = true;
    let data = this.form.value;

    if (data) {
      if (UtilsRepository.isNumberString(data.produto)) {
        this.produtoService.getByCodigo(data.produto).subscribe({
          next: (produto: Produto) => {
            let prod: produtoVenda = {
              id: produto.id ?? "",
              codigo: produto.codigoProduto,
              descricao: produto.descricao,
              quantidade: 1,
              valor: produto.valorUnitario
            }
            this.setProduto(prod);

            this.loading = false;
            this.form.get('produto')?.reset();
          },
          error: (err: any) => {
            this.loading = false;
          }
        })
      } else {
        this.produtoService.getByNome(data.produto).subscribe({
          next: (produto: Produto[]) => {
            this.modalProducts = produto.map((prod: Produto) => ({
              id: prod.id ?? "",
              codigo: prod.codigoProduto,
              descricao: prod.descricao,
              quantidade: prod.quantidade,
              valor: prod.valorUnitario
            }))
            this.modalProdutosVisible = true;
            this.loading = false;
            this.form.get('produto')?.reset();
          }, error: () => {
            this.loading = false;
          }
        })
      }
    }
  }

  disableProdutoField() {
    this.form.get('produto')?.disable();
    this.buttonSearchDisable = true;
  }

  changeDisabledProdutoField(value: any) {
    if (value && value !== '') {
      this.form.get('produto')?.enable();
      this.buttonSearchDisable = false;
    } else {
      this.disableProdutoField();
    }
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
    this.getStatus();
    this.disableProdutoField();
    this.getVenda();
  }


  confirmarProdutoSelecionado() {
    this.selectedModalProduct!.quantidade = 1;
    this.setProduto(this.selectedModalProduct as produtoVenda);
    this.closeModalProdutos();
  }

  resetFields() {
    this.produtos = [];
    this.form.reset();
    this.selectedModalProduct = undefined;
    this.total = 0;
    this.subTotal = 0;
    this.desconto = 0;
  }

  finalizarVenda() {
    this.loading = true;
    let status = this.status.find(x => x.descricao === 'Em aberto');
    let data: Venda = {
      total: this.total,
      subTotal: this.subTotal,
      desconto: this.desconto,
      data: new Date(),
      statusId: status?.id,
      clienteId: this.form.get('clienteId')?.value,
      produtos: this.produtos.map((produto: produtoVenda) => ({
        produtoId: produto.id,
        clienteId: this.form.get('clienteId')?.value,
        quantidadeComprada: produto.quantidade,
      })),
    }

    this.service.post(data).subscribe({
      next: (result: Venda) => {
        this.showMessage('success', 'Venda', 'Venda finalizada com sucesso!');
        this.resetFields();
        this.loading = false;
      }, error: (err: any) => {
        this.loading = false;
      }
    })
  }
}
