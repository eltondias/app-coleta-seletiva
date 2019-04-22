import { Moment } from 'moment';
import { ISolicitacaoRetirada } from './solicitacao-retirada.model';
import { IColetor } from './coletor.model';
 

export interface IRetirada {
    id?: number;
    dataHoraAgendada?: Moment;
    dataHoraRealizada?: Moment;
    dataHoraConfirmacao?: Moment;
    solicitacaoRetirada?: ISolicitacaoRetirada;
    coletor?: IColetor;
}

export class Retirada implements IRetirada {
    constructor(
        public id?: number,
        public dataHoraAgendada?: Moment,
        public dataHoraRealizada?: Moment,
        public dataHoraConfirmacao?: Moment,
        public solicitacaoRetirada?: ISolicitacaoRetirada,
        public coletor?: IColetor
    ) {}
}
