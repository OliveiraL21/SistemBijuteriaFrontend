
export class Venda {
  id: string = "";
  codigo: string | null = null;
  total: number = 0;
  subTotal: number = 0;
  desconto: number = 0;
  data: Date | null = null;
  clienteId: string = "";
  maletaId: string = "";
  statusId: any;
  produtos: any[] = [];
}
