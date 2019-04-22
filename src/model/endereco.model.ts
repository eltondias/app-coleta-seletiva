import { ICidade } from './cidade.model';
import { IParticipante } from './participante.model';


export interface IEndereco {
    id?: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    latitude?: string;
    longitude?: string;
    cidade?: ICidade;
    participante?: IParticipante;
}

export class Endereco implements IEndereco {
    constructor(
        public id?: number,
        public logradouro?: string,
        public numero?: string,
        public complemento?: string,
        public bairro?: string,
        public cep?: string,
        public latitude?: string,
        public longitude?: string,
        public cidade?: ICidade,
        public participante?: IParticipante
    ) {}
}
