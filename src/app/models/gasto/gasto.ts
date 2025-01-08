import { Moneda } from '../moneda/moneda';

export class Gasto {
  idGasto: number;
  titulo: string;
  descripcion: string;
  files: File[];
  proveedor: string;
  observaciones: string;
  fecha: string;
  monto: number;
  idMoneda: number;
  moneda?: Moneda;
}
