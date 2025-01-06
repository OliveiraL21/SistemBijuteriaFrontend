import { Status } from "../status/Status";

export class Maleta {
  id: string | null = null;
  Troca: Date | null = null;
  Envio: Date | null = null;
  Pagamento: Date | null = null;
  numero: string | null = null;
  status: Status | null = null;
  statusId: string | null = null;
}
