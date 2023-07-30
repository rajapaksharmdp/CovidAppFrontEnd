import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCertificatesPageRoutingModule } from './my-certificates-routing.module';

import { MyCertificatesPage } from './my-certificates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCertificatesPageRoutingModule
  ],
  declarations: [MyCertificatesPage]
})
export class MyCertificatesPageModule {}
