import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap,map } from 'rxjs/operators';

export class Person {
  id!: string;
  name!: string;
  nic!: string;
  dob!: number;
  address!: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataService: any;
  

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http:HttpClient) { }

  provider(nic:any){

    return this.http.get(`../../assets/data/sampledata.json?nic=${window.atob(nic)}`);
  // .pipe(map((response:Response)=>response.json()));

  // console.log(`this.dataService`, this.dataService);
  };
}
