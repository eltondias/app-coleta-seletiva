import { Moment } from 'moment';
import { IHorarioPreferencialRetirada } from './horario-preferencial-retirada.model';
import { IImagem } from './imagem.model';
import { ITipoResiduo } from './tipo-residuo.model';
import { IProdutor } from './produtor.model';
 
export interface ISolicitacaoRetirada {
    id?: number;
    descricao?: string;
    dataHora?: Moment;
    horarioPreferencialRetiradas?: IHorarioPreferencialRetirada[];
    imagems?: IImagem[];
    tipoResiduos?: ITipoResiduo[];
    produtor?: IProdutor;
}

export class SolicitacaoRetirada implements ISolicitacaoRetirada {
    constructor(
        public id?: number,
        public descricao?: string,
        public dataHora?: Moment,
        public horarioPreferencialRetiradas?: IHorarioPreferencialRetirada[],
        public imagems?: IImagem[],
        public tipoResiduos?: ITipoResiduo[],
        public produtor?: IProdutor
    ) {}
}
