import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificatesPageRoutingModule } from './certificates-routing.module';

import { CertificatesPage } from './certificates.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificatesPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [CertificatesPage]
})
export class CertificatesPageModule {
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
}
