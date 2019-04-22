import { Produtor, TipoProdutor } from './../../model/produtor.model';
import { Coletor, TipoColetor } from './../../model/coletor.model';
import { ProdutorService } from './../../services/produtor.service';
import { ColetorService } from './../../services/coletor.service';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../model/usuario.model';
import { DATE_TIME_FORMAT } from './../../constants/input.constants';
import { Participante, IParticipante, EstadoParticipante } from './../../model/participante.model';
import { Component, OnInit, Input } from '@angular/core';
import { IUsuario } from 'src/model/usuario.model';
import { ParticipanteService } from 'src/services/participante.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-conta',
    templateUrl: './conta.page.html',
    styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {

    participante = new Participante();
    usuario = new Usuario();

    constructor(
        protected participanteService: ParticipanteService,
        protected usuarioService: UsuarioService,
        protected coletorService: ColetorService,
        protected produtorService: ProdutorService,
        public modal: ModalController,
        protected activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() { }

    save() {
        if (this.participante.id !== undefined) {
            this.participanteService.update(this.participante).subscribe((res: HttpResponse<IParticipante>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
        } else {
            this.participante.estado = EstadoParticipante.INATIVO;
            this.participante.ranking = 0;
            this.participante.cpfCnpj = '0';
            this.participante.dataCadastro = moment(new Date(), DATE_TIME_FORMAT);
            this.participanteService.create(this.participante).subscribe((res: HttpResponse<IParticipante>) => {
                this.participante = res.body;
                localStorage.setItem('participante', JSON.stringify(this.participante));
                console.log('Participante salvo com sucesso!', this.participante);
                this.saveUsuario();
            },
                (res: HttpErrorResponse) => {
                    this.onSaveError()
                });
        }
    }


    protected onSaveSuccess() {
    }

    protected onSaveError() {
    }

    saveUsuario() {
        if (this.participante.id !== undefined) {
            this.usuario.participante = this.participante;
            this.usuario.dataCadastro = moment(new Date(), DATE_TIME_FORMAT);
            this.usuarioService.create(this.usuario).subscribe((res: HttpResponse<IUsuario>) => {
                console.log('usuário salvo com sucesso', res);
            },
                (res: HttpErrorResponse) => {
                    console.log('Erro ao salvar o usuário', res);
                    if (confirm('Deseja tentar novamente?')) {
                        this.saveUsuario();
                    }
                });
        }
    }


    async openModal(ModalPage, propriedade) {
        const modal = await this.modal.create({
            component: ModalPage,
            componentProps: propriedade
        });
        return await modal.present();
    }


    async saveColetor() {
        const coletor = new Coletor();
        coletor.participante = this.participante;
        coletor.nome = this.participante.nome;
        coletor.dataCadastro = moment(new Date(), DATE_TIME_FORMAT);
        // coletor.tipo = TipoColetor.
        // this.coletorService.create().subscribe();
        const modal = await this.modal.create({
            component: ModalTipoColetor,
            componentProps: {}
        });
        modal.present();
        const { data }  = await modal.onDidDismiss();
        console.log(data);
    }

    saveProdutor() {
        const produtor = new Produtor();
        produtor.dataCadastro = moment(new Date(), DATE_TIME_FORMAT);
        produtor.participante = this.participante;
        produtor.nome = this.participante.nome;
    }



}

@Component({
    selector: 'modal-page',
    template: `
    <ion-toolbar color="primary">   
        <ion-buttons slot="primary">
        <ion-button (click)="close()">
        <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
        </ion-buttons>
        <ion-title>Tipos de coletor</ion-title>
    </ion-toolbar>
    <ion-content >
        <ion-list class="p-4">
        <ion-radio-group>    
        <ion-item *ngFor="let tipo of tipos">
            <ion-label> {{tipo}} </ion-label>
            <ion-radio slot="start" value="{{tipo}}"  (click)="selecione(tipo)"></ion-radio>
        </ion-item>
        </ion-radio-group>
    </ion-list>
    </ion-content>
    `
    ,
})
export class ModalTipoColetor {
    @Input() value: number;

    tipos = [];
    constructor(navParams: NavParams, public modal: ModalController) {
        for (const tipo in TipoColetor) {
            this.tipos.push(tipo);
        }
    }

    selecione(tipo) {
        this.modal.dismiss({'result': tipo})
    }

    close() {
        this.modal.dismiss({'result': 0})
    }

}

