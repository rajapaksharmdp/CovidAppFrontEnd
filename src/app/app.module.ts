import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZBar } from '@ionic-native/zbar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';

import { IonicStorageModule } from '@ionic/storage-angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NotificationsComponent } from './home/dropdown/notifications/notifications.component';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

export function jwtOptionsFactory(storage:any) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: [
      'http://localhost:8100',
      'http://localhost',
      'http://localhost:8101',
      'http://localhost/',
      'capacitor://localhost',
      'ionic://localhost',
      'http://localhost:8080',
      // 'https://lk-safe.herokuapp.com/upload',
      // 'https://lk-safe.herokuapp.com/api',
      // 'https://setuinfo.kln.ac.lk/upload',
      // 'https://setuinfo.kln.ac.lk/api',
      // 'https://setuinfo.kln.ac.lk/',
    ],
  };
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    RouterModule,
    // CertificatesPageModule,
    // ForgotPasswordPageModule,
    // HomePageModule,
    // LoginPageModule,
    // NicVerificationPageModule,
    // RegistrationPageModule,
    // SettingsPageModule,
    // VerifyCertificatePageModule,
    // WelcomePageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      },
    }),
  ],
  providers: [
    ZBar,
    Camera,
    File,
    FileOpener,
    File,
    SplashScreen,
    StatusBar,
    Storage,
    PDFGenerator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
