import { Moment } from 'moment';
import { ISolicitacaoRetirada } from './solicitacao-retirada.model';

export interface IHorarioPreferencialRetirada {
    id?: number;
    dataHora?: Moment;
    solicitacaoRetirada?: ISolicitacaoRetirada;
}

export class HorarioPreferencialRetirada implements IHorarioPreferencialRetirada {
    constructor(public id?: number, public dataHora?: Moment, public solicitacaoRetirada?: ISolicitacaoRetirada) {}
}
