import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const baseUrl = 'http://localhost:5000/auth';
// const baseUrl = 'https://lk-safe.herokuapp.com/auth';
// const baseUrl = 'https://setuinfo.kln.ac.lk/auth';



const TOKEN_KEY = 'access_token';
const _USER_Name = 'user_name';
const _USER_ROLE = 'user_role';
const _USER_NIC ='user_nic'

interface ApiResponse {
  token: string;
  
}

interface User {
  name: string;
  role: string;
  nic: string;

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = baseUrl;
  user: User | null = null;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController
  ) {
     this.storage.create();
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
 
  register(credentials:any) {
    return this.http.post(`${this.url}/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials: any) {
    return this.http.post<ApiResponse>(`${this.url}/login`, credentials).pipe(
      tap((res: ApiResponse) => {
        if (res && res.token) {
          this.storage.set(TOKEN_KEY, res.token);
          this.user = this.helper.decodeToken<User>(res.token);
          if (this.user) {
            this.storage.set(_USER_Name, this.user.name);
            this.storage.set(_USER_ROLE, this.user.role);
            this.storage.set(_USER_NIC, this.user.nic);
          }
          this.authenticationState.next(true);
        } else {
          // Handle the case when the response does not contain a token
          throw new Error('Invalid response: Token not found.');
        }
      }),      
      catchError((e: any) => {
        this.showAlert(e.error.msg);
        return throwError(e);
      })
    );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(_USER_Name);
      this.storage.remove(_USER_ROLE);
      this.authenticationState.next(false);
    });
  }
 
  getSpecialData() {
    return this.http.get(`${this.url}/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg: string) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
