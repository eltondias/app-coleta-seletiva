import { ISolicitacaoRetirada } from './solicitacao-retirada.model';
import { IColetor } from './coletor.model';

 

export interface ITipoResiduo {
    id?: number;
    nome?: string;
    descricao?: string;
    cor?: string;
    icone?: string;
    solicitacaoRetiradas?: ISolicitacaoRetirada[];
    coletors?: IColetor[];
}

export class TipoResiduo implements ITipoResiduo {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public cor?: string,
        public icone?: string,
        public solicitacaoRetiradas?: ISolicitacaoRetirada[],
        public coletors?: IColetor[]
    ) {}
}
