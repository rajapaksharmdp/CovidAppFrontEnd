import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddNewUserComponent } from './add-new-user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddNewUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule // Import IonicModule to include Ionic components
  ],
})
export class AddNewUserModule {}
