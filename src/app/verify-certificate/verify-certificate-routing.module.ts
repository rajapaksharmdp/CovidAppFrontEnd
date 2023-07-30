import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyCertificatePage } from './verify-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyCertificatePageRoutingModule {}
