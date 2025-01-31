import { Maleta } from "../maleta/Maleta";
import TipoProduto from "../tipoProduto/tipoProduto";

export default class Produto {
  id: string | null = null;
  codigoProduto: number = 0;
  descricao: string = "";
  quantidade: number = 0;
  valorUnitario: number = 0;
  tipoProduto: TipoProduto = new TipoProduto();
  maleta: Maleta = new Maleta();
}
