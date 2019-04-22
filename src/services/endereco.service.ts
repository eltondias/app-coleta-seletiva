import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';
import { IEndereco } from 'src/model/endereco.model';

type EntityResponseType = HttpResponse<IEndereco>;
type EntityArrayResponseType = HttpResponse<IEndereco[]>;

@Injectable({ providedIn: 'root' })
export class EnderecoService {
    public resourceUrl =  environment.URL_API  + 'api/enderecos';

    constructor(protected http: HttpClient) {}

    create(endereco: IEndereco): Observable<EntityResponseType> {
        return this.http.post<IEndereco>(this.resourceUrl, endereco, { observe: 'response' });
    }

    update(endereco: IEndereco): Observable<EntityResponseType> {
        return this.http.put<IEndereco>(this.resourceUrl, endereco, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEndereco>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEndereco[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
