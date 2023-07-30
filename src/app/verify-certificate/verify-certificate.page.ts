import { Component, OnInit } from '@angular/core';

import { ZBarOptions, ZBar } from '@ionic-native/zbar/ngx';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/api/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-verify-certificate',
  templateUrl: './verify-certificate.page.html',
  styleUrls: ['./verify-certificate.page.scss'],
})
export class VerifyCertificatePage {
  optionZbar: any;
  scannedOutput: any;
  qrData: any;
  details: any;
  dataFound!: boolean;
  message!: string;

  dose1only = false;
  dose1and2only = false;

  // nic = '942402228V';
  // decrypednic: any;
  userData: User = new User();
  constructor(
    public zbarPlugin: ZBar,
    public dataService: DataService,
    public toastController: ToastController,
    private userservice: UserService
  ) {
    this.optionZbar = {
      flash: 'off',
      drawSight: true,
      text_instructions: 'Please point your camera at the QR code.',
    };

    // this.dataService.provider(this.nic).subscribe((response) => {
    //   this.details = response;
    //   console.log(this.details);
    // });
  }

  ionViewWillEnter() {
    this.barcodeScanner();
  }

  // barcodeScanner() {
  //   this.zbarPlugin
  //     .scan(this.optionZbar)
  //     .then((respone) => {
  //       console.log(respone);
  //       //alert(respone);
  //       this.scannedOutput = respone;
  //       this.qrData = this.details.find(detail => detail.nic === this.scannedOutput);
  //       this.decrypednic = atob(this.qrData.nic);
  //       if(this.scannedOutput !== undefined) {
  //         this.dataFound = true;
  //         this.message = `Record found !`;
  //         this.presentToast(this.message);
  //        } else {
  //         this.dataFound = false;
  //         this.message = `Record not found !`;
  //         this.presentToast(this.message);
  //       }})
  //         .catch((error) => {
  //           alert(error);
  //     });
  // }

  barcodeScanner() {
    this.zbarPlugin
      .scan(this.optionZbar)
      .then((respone) => {
        // console.log(respone);

        this.scannedOutput = respone;
        // alert( this.scannedOutput);
        if (this.scannedOutput !== undefined) {
          // console.log(`objectqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq`, JSON.stringify(data))
          this.userservice.getUserbyId(this.scannedOutput).subscribe((data) => {
            this.userData = JSON.parse(JSON.stringify(data));
            //  alert(this.userData)
            if (this.userData.dose2 == undefined) {
              this.dose1only = true;
            } else if (this.userData.dose3 == undefined) {
              this.dose1and2only = true;
            }
          });

          if (respone === JSON.stringify(this.userData._id)) {
            this.dataFound = true;
            this.message = `Record found !`;
            this.presentToast(this.message);
          }
        } else {
          this.dataFound = false;
          this.message = `Record not found !`;
          this.presentToast(this.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
