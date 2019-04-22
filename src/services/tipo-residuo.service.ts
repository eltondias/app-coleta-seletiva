import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';
import { ITipoResiduo } from 'src/model/tipo-residuo.model';

type EntityResponseType = HttpResponse<ITipoResiduo>;
type EntityArrayResponseType = HttpResponse<ITipoResiduo[]>;

@Injectable({ providedIn: 'root' })
export class TipoResiduoService {
    public resourceUrl = environment.URL_API  + 'api/tipo-residuos';

    constructor(protected http: HttpClient) {}

    create(tipoResiduo: ITipoResiduo): Observable<EntityResponseType> {
        return this.http.post<ITipoResiduo>(this.resourceUrl, tipoResiduo, { observe: 'response' });
    }

    update(tipoResiduo: ITipoResiduo): Observable<EntityResponseType> {
        return this.http.put<ITipoResiduo>(this.resourceUrl, tipoResiduo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoResiduo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoResiduo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
