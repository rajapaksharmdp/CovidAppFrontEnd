import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'scan',
    loadChildren: () =>
      import('./my-certificates/my-certificates.module').then(
        (m) => m.MyCertificatesPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'verifycertificate',
    loadChildren: () =>
      import('./verify-certificate/verify-certificate.module').then(
        (m) => m.VerifyCertificatePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'addnewcertificate',
    loadChildren: () =>
      import('./add-new-certificate/add-new-certificate.module').then(
        (m) => m.AddNewCertificatePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'nicverify',
    loadChildren: () =>
      import('./nic-verification/nic-verification.module').then(
        (m) => m.NicVerificationPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'certificates/:id',
    loadChildren: () =>
      import('./certificates/certificates.module').then(
        (m) => m.CertificatesPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'uploads',
    loadChildren: () =>
      import('./uploads/uploads.module').then((m) => m.UploadsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'verify-certificate',
    loadChildren: () =>
      import('./verify-certificate/verify-certificate.module').then(
        (m) => m.VerifyCertificatePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'my-certificates',
    loadChildren: () =>
      import('./my-certificates/my-certificates.module').then(
        (m) => m.MyCertificatesPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-new-certificate',
    loadChildren: () =>
      import('./add-new-certificate/add-new-certificate.module').then(
        (m) => m.AddNewCertificatePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
   
  },
  {
    path: 'nic-verification',
    loadChildren: () =>
      import('./nic-verification/nic-verification.module').then(
        (m) => m.NicVerificationPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
