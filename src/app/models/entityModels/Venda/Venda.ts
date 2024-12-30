import Produto from "../produtos/produto";

export class Venda {
  codigo: string | null = null;
  total: number = 0;
  subTotal: number = 0;
  desconto: number = 0;
  data: Date | null = null;
  clienteId: string = "";
  statusId: any;
  produtos: any[] = [];
}
