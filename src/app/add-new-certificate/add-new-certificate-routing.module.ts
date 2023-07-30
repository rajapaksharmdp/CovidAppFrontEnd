import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewCertificatePage } from './add-new-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewCertificatePageRoutingModule {}
