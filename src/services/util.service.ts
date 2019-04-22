import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UtilService {

  public notificacoesRetiradas =  new EventEmitter();
  public notificacoesSugestao =  new EventEmitter();
  public notificacoesMensagens =  new EventEmitter();

  constructor() { }

}
