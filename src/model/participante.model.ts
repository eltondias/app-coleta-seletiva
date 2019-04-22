import { Moment } from 'moment';
import { IEndereco } from './endereco.model';
import { ITelefone } from './telefone.model';
import { IEmail } from './email.model';
import { IRedeSocial } from './rede-social.model';
import { IUsuario } from './usuario.model';
 

export const enum EstadoParticipante {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    SUSPENSO = 'SUSPENSO'
}

export interface IParticipante {
    id?: number;
    nome?: string;
    urlFotoPerfil?: string;
    cpfCnpj?: string;
    dataCadastro?: Moment;
    ranking?: number;
    estado?: EstadoParticipante;
    enderecos?: IEndereco[];
    telefones?: ITelefone[];
    emails?: IEmail[];
    redeSocials?: IRedeSocial[];
    usuario?: IUsuario;
}

export class Participante implements IParticipante {
    constructor(
        public id?: number,
        public nome?: string,
        public urlFotoPerfil?: string,
        public cpfCnpj?: string,
        public dataCadastro?: Moment,
        public ranking?: number,
        public estado?: EstadoParticipante,
        public enderecos?: IEndereco[],
        public telefones?: ITelefone[],
        public emails?: IEmail[],
        public redeSocials?: IRedeSocial[],
        public usuario?: IUsuario
    ) {}
}
