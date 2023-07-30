import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyCertificatePageRoutingModule } from './verify-certificate-routing.module';

import { VerifyCertificatePage } from './verify-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyCertificatePageRoutingModule
  ],
  declarations: [VerifyCertificatePage]
})
export class VerifyCertificatePageModule {}
