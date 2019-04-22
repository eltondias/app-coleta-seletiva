import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';
import { IProdutor } from 'src/model/produtor.model';

type EntityResponseType = HttpResponse<IProdutor>;
type EntityArrayResponseType = HttpResponse<IProdutor[]>;

@Injectable({ providedIn: 'root' })
export class ProdutorService {
    public resourceUrl = environment.URL_API  + 'api/produtors';

    constructor(protected http: HttpClient) {}

    create(produtor: IProdutor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(produtor);
        return this.http
            .post<IProdutor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(produtor: IProdutor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(produtor);
        return this.http
            .put<IProdutor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProdutor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProdutor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(produtor: IProdutor): IProdutor {
        const copy: IProdutor = Object.assign({}, produtor, {
            dataCadastro: produtor.dataCadastro != null && produtor.dataCadastro.isValid() ? produtor.dataCadastro.toJSON() : null
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
            res.body.forEach((produtor: IProdutor) => {
                produtor.dataCadastro = produtor.dataCadastro != null ? moment(produtor.dataCadastro) : null;
            });
        }
        return res;
    }
}
