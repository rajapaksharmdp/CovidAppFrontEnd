import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:5000';
// const baseUrl = 'https://covidappsl-659099c3f326.herokuapp.com'
// const baseUrl = 'https://setuinfo.kln.ac.lk'



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any>{
    return this.http.get(`${baseUrl}/files`);
  }

  getAllImagebyName(name:any): Observable<any>{
    return this.http.get(`${baseUrl}/files/${name}`);
  }

  imageUpload(imagedata: FormData) : Observable<any>{
    return this.http.post(`${baseUrl}/upload`,imagedata);
  }

  imagesUpload(imagedata: FormData) : Observable<any>{
    return this.http.post(`${baseUrl}/multiupload`,imagedata);
  }
}
