import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as faker from 'faker';
import { User } from '../models/user';

import {
  AlertController,
  IonInfiniteScroll,
  IonVirtualScroll,
  LoadingController,
} from '@ionic/angular';
import { UserService } from '../services/api/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const _USER_NIC ='user_nic'

@Component({
  selector: 'app-my-certificates',
  templateUrl: './my-certificates.page.html',
  styleUrls: ['./my-certificates.page.scss'],
})
export class MyCertificatesPage implements OnInit {
  dataList = [];
   finaldata: User = new User();
  isLoading = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  userNic: any;
default = false;
  

  constructor(
    private userservice: UserService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private storage: Storage,
  ) {
    // this.getData();
    
    this.storage.get(_USER_NIC).then((res)=>{
      this.userNic = res;
    });
    
  }

  ngOnInit() {}

  ionViewWillEnter() {
   
  }

  ionViewDidEnter() {
    this.getData();
}

  getData() {
    // for (let i = 0; i < 20; i++) {
    //   this.dataList.push({
    //     image: faker.image.avatar(),
    //     name: faker.name.firstName(),
    //     address: faker.address.streetAddress(),
    //     intro: faker.lorem.words()
    //   })
    // }

    this.present();
// console.log(`this.userNic`, this.userNic)
    this.userservice.getUserbyNic(this.userNic).subscribe((data) => {
     
    
      this.finaldata = JSON.parse(JSON.stringify(data));
      // if(this.finaldata.primarynic  == this.finaldata.nic){
      //   this.default = true;
      //      }else{
      //        this.default = false;
      //      }

  //  data= JSON.parse(data);
  //  console.log(`data`, data)
  this.dismiss();
      //   for (let i = 0; i < Object.keys(this.finaldata).length; i++) {
      //   this.dataList.push({
      //     _id: data._id,
      //     userimg_filename: data.userimg_filename,
      //     name: data.first_name+' '+ data.last_name,
      //     nic: data.nic,
      //     // intro: faker.lorem.words()
      
      //   })
      // }
      
      // console.log(`tttttttttttttttttt`, this.dataList);
      
    }, (error)=>{

    });
  }

  loadData(event) {
    // Using settimeout to simulate api call
    setTimeout(() => {
      // load more data
      
      this.getData();
      
      //Hide Infinite List Loader on Complete
      event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async presentAlertConfirm(_id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Certificate',
      message:
        '<ion-icon  class="custom-icon-warn"  name="alert-circle-outline"></ion-icon> <br> <h2>Are you sure you want to delete this certificate?</h2>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'delete',
          cssClass: 'danger',
          handler: () => {
            // console.log('Confirm Okay');
            this.deletecertificate(_id);
          },
        },
      ],
    });

    await alert.present();
  }

  deletecertificate(id: any) {
    this.userservice.deleteUser(id).subscribe((res) => {
      this.getData();
    });
  }

  viewcertificate(id: any) {
    this.router.navigate(['/certificates', id]);
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        // duration: 5000,
        message: 'Please wait...',
        spinner: 'crescent',
      })
      .then((a) => {
        a.present().then(() => {
          // console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() =>
       console.log('dismissed')
       );
  }
}
