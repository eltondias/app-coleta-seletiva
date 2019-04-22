import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { createRequestOption } from './request-util';
import { IColetor } from 'src/model/coletor.model';
import { environment } from 'src/environments/environment';
 
type EntityResponseType = HttpResponse<IColetor>;
type EntityArrayResponseType = HttpResponse<IColetor[]>;

@Injectable({ providedIn: 'root' })
export class ColetorService {
    public resourceUrl =  environment.URL_API  + 'api/coletors';

    constructor(protected http: HttpClient) {}

    create(coletor: IColetor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(coletor);
        return this.http
            .post<IColetor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(coletor: IColetor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(coletor);
        return this.http
            .put<IColetor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IColetor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IColetor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(coletor: IColetor): IColetor {
        const copy: IColetor = Object.assign({}, coletor, {
            dataCadastro: coletor.dataCadastro != null && coletor.dataCadastro.isValid() ? coletor.dataCadastro.toJSON() : null
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
            res.body.forEach((coletor: IColetor) => {
                coletor.dataCadastro = coletor.dataCadastro != null ? moment(coletor.dataCadastro) : null;
            });
        }
        return res;
    }
}
