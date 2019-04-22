import { ISolicitacaoRetirada } from './solicitacao-retirada.model';

 
export interface IImagem {
    id?: number;
    url?: string;
    descricao?: string;
    solicitacaoRetirada?: ISolicitacaoRetirada;
}

export class Imagem implements IImagem {
    constructor(public id?: number, public url?: string, public descricao?: string, public solicitacaoRetirada?: ISolicitacaoRetirada) {}
}
