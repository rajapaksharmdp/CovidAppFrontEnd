import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NicVerificationPage } from './nic-verification.page';

const routes: Routes = [
  {
    path: '',
    component: NicVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NicVerificationPageRoutingModule {}
