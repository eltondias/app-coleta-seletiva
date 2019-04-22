import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';
import { IParticipante } from 'src/model/participante.model';

type EntityResponseType = HttpResponse<IParticipante>;
type EntityArrayResponseType = HttpResponse<IParticipante[]>;

@Injectable({ providedIn: 'root' })
export class ParticipanteService {
    public resourceUrl = environment.URL_API  + 'api/participantes';

    constructor(protected http: HttpClient) {}

    create(participante: IParticipante): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(participante);
        return this.http
            .post<IParticipante>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(participante: IParticipante): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(participante);
        return this.http
            .put<IParticipante>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IParticipante>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IParticipante[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(participante: IParticipante): IParticipante {
        const copy: IParticipante = Object.assign({}, participante, {
            dataCadastro:
                participante.dataCadastro != null && participante.dataCadastro.isValid() ? participante.dataCadastro.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataCadastro = res.body.dataCadastro != null ? moment(res.body.dataCadastro) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((participante: IParticipante) => {
                participante.dataCadastro = participante.dataCadastro != null ? moment(participante.dataCadastro) : null;
            });
        }
        return res;
    }
}
