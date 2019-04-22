import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';
import { IImagem } from 'src/model/imagem.model';

type EntityResponseType = HttpResponse<IImagem>;
type EntityArrayResponseType = HttpResponse<IImagem[]>;

@Injectable({ providedIn: 'root' })
export class ImagemService {
    public resourceUrl = environment.URL_API  + 'api/imagems';

    constructor(protected http: HttpClient) {}

    create(imagem: IImagem): Observable<EntityResponseType> {
        return this.http.post<IImagem>(this.resourceUrl, imagem, { observe: 'response' });
    }

    update(imagem: IImagem): Observable<EntityResponseType> {
        return this.http.put<IImagem>(this.resourceUrl, imagem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IImagem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IImagem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
