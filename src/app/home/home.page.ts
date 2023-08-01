import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NotificationsComponent } from './dropdown/notifications/notifications.component';

const _USER_Name = 'user_name';
const _USER_ROLE = 'user_role';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userName: any;
  userRole:any;

  constructor(
    public navController: NavController,
    private router: Router,
    private storage: Storage,
    public popoverCtrl: PopoverController
  ) {
    this.storage.get(_USER_Name).then((data) => {
      this.userName = data;
    });
    this.storage.get(_USER_ROLE).then((res)=>{
      this.userRole = res;
    });
  }

  ionViewWillLeave(){
    //  this.popoverCtrl.dismiss();
  }

  async notifications(ev: any) {  
    const popover = await this.popoverCtrl.create({  
        component: NotificationsComponent,  
        event: ev,  
        showBackdrop: true,
        animated: true,  
       
        translucent: true,
    });  
    return await popover.present();  
  }  

  

  // navigate() {
  //   // this.navController.navigateForward(['/scan']);
 
  //   this.router.navigate(['/addnewuser']);
  // }
}
