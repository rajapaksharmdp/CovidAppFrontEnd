import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:5000/api';
// const baseUrl = 'https://lk-safe.herokuapp.com/api';
const baseUrl = 'https://setuinfo.kln.ac.lk/api'



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getUserbyId(id:any): Observable<any>{
    return this.http.get(`${baseUrl}/fetchuser/${id}`);
  }

  getUserbyNic(nic:any): Observable<any>{
    return this.http.get(`${baseUrl}/fetchusernic/${nic}`);
  }

  createUser(userdata: any): Observable<any>{
    return this.http.post(`${baseUrl}/createuser`,userdata);
  }

  updateUser(id:any, userdata:any): Observable<any>{
    return this.http.put(`${baseUrl}/updateuser/${id}`, userdata);
  }

  deleteUser(id:any): Observable<any>{
    return this.http.delete(`${baseUrl}/deleteuser/${id}`);
  }

  








}
