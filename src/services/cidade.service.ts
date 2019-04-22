import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICidade } from 'src/model/cidade.model';
import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';

type EntityResponseType = HttpResponse<ICidade>;
type EntityArrayResponseType = HttpResponse<ICidade[]>;

@Injectable({ providedIn: 'root' })
export class CidadeService {
    public resourceUrl = environment.URL_API + 'api/cidades';

    constructor(protected http: HttpClient) {}

    create(cidade: ICidade): Observable<EntityResponseType> {
        return this.http.post<ICidade>(this.resourceUrl, cidade, { observe: 'response' });
    }

    update(cidade: ICidade): Observable<EntityResponseType> {
        return this.http.put<ICidade>(this.resourceUrl, cidade, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICidade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICidade[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
