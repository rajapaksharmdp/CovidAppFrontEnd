import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { ScanComponent } from './scan/scan.component';
// import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    // canActivate: [AuthGuardService],
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
    // canActivate: [AuthGuardService],
  },
  {
    path: 'uploads',
    loadChildren: () =>
      import('./uploads/uploads.module').then((m) => m.UploadsPageModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
   
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: 'addnewuser',
    component: AddNewUserComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'showusers',
    component: ShowUsersComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'scan',
    component: ScanComponent,
    // canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
