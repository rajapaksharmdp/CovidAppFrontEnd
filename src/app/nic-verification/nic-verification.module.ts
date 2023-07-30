import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NicVerificationPageRoutingModule } from './nic-verification-routing.module';

import { NicVerificationPage } from './nic-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NicVerificationPageRoutingModule
  ],
  declarations: [NicVerificationPage]
})
export class NicVerificationPageModule {}
