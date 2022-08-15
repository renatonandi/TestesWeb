import { EnumTipoBanco } from '../enums/enum-tipo-banco';

export interface BancoModel {
  id: string;
  codigo: number;
  nome: string;
  tipo: EnumTipoBanco;
}
