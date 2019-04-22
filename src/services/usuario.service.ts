import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { createRequestOption } from './request-util';
import { IUsuario } from 'src/model/usuario.model';

type EntityResponseType = HttpResponse<IUsuario>;
type EntityArrayResponseType = HttpResponse<IUsuario[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    public resourceUrl = environment.URL_API  + 'api/usuarios';

    constructor(protected http: HttpClient) {}

    create(usuario: IUsuario): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(usuario);
        return this.http
            .post<IUsuario>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(usuario: IUsuario): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(usuario);
        return this.http
            .put<IUsuario>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUsuario[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(usuario: IUsuario): IUsuario {
        const copy: IUsuario = Object.assign({}, usuario, {
            dataCadastro: usuario.dataCadastro != null && usuario.dataCadastro.isValid() ? usuario.dataCadastro.toJSON() : null
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
            res.body.forEach((usuario: IUsuario) => {
                usuario.dataCadastro = usuario.dataCadastro != null ? moment(usuario.dataCadastro) : null;
            });
        }
        return res;
    }
}
