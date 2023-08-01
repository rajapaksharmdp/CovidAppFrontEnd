import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent()
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe((state) => {
        if (state) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/welcome']);
        }
      });
    });
  }
}
