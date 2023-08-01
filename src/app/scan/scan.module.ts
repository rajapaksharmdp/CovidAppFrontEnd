import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanComponent } from './scan.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
  ],
  declarations: [ScanComponent]
})
export class ScanPageModule {}
