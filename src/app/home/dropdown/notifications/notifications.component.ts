import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storage: Storage,
    private toastController: ToastController,
    private popoverCtrl: PopoverController,
    public alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.popoverCtrl.dismiss();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Succesfully logged out!.',
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Certificate',
      message:
        'Are you sure you want to signout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Signout',
          cssClass: 'danger',
          handler: () => {
            // console.log('Confirm Okay');
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  add(){
    this.router.navigate(['/addnewuser']);
    this.popoverCtrl.dismiss();
  }

  settings(){
    this.router.navigate(['/settings']);
    this.popoverCtrl.dismiss();
  }

  about(){
    this.router.navigate(['/about']);
    this.popoverCtrl.dismiss();
  }
}
