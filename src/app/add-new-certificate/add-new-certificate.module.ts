import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewCertificatePageRoutingModule } from './add-new-certificate-routing.module';

import { AddNewCertificatePage } from './add-new-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewCertificatePageRoutingModule
  ],
  declarations: [AddNewCertificatePage]
})
export class AddNewCertificatePageModule {}
