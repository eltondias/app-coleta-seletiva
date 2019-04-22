import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContaPage, ModalTipoColetor } from './conta.page';

const routes: Routes = [
  {
    path: '',
    component: ContaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ModalTipoColetor],
  declarations: [ContaPage, ModalTipoColetor]
})
export class ContaPageModule {}
