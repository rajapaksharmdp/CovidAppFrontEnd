import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCertificatesPage } from './my-certificates.page';

const routes: Routes = [
  {
    path: '',
    component: MyCertificatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCertificatesPageRoutingModule {}
