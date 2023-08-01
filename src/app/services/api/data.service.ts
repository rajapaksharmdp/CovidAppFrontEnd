import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/data';
// const baseUrl = 'https://lk-safe.herokuapp.com/data';
// const baseUrl = 'https://setuinfo.kln.ac.lk/data'


@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  constructor(private http: HttpClient) { }


  getAllData(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getDatabyId(id:any): Observable<any>{
    return this.http.get(`${baseUrl}/fetchuser/${id}`);
  }

  getDatabyNic(nic:any): Observable<any>{
    return this.http.get(`${baseUrl}/fetchusernic/${nic}`);
  }

  createData(userdata: any): Observable<any>{
    return this.http.post(`${baseUrl}/createuser`,userdata);
  }

  updateData(id:any, userdata:any): Observable<any>{
    return this.http.put(`${baseUrl}/updateuser/${id}`, userdata);
  }

  deleteData(id:any): Observable<any>{
    return this.http.delete(`${baseUrl}/deleteuser/${id}`);
  }
}
