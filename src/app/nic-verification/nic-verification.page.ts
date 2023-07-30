import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/api/data.service';


@Component({
  selector: 'app-nic-verification',
  templateUrl: './nic-verification.page.html',
  styleUrls: ['./nic-verification.page.scss'],
})
export class NicVerificationPage implements OnInit {
  nic:any;
  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {}

  login(nic:any) {
    
   if(nic != undefined){
    this.dataservice.getDatabyNic(nic).subscribe((data)=>{
      
      if(nic === data[0].nic){
        this.router.navigate(['/addnewcertificate'], { state: {data:data}});
      }else{
        console.log("contact your system admin" )
      }
      
    },(error)=>{

    });
   }
    
  }
}
