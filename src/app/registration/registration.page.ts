import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  credentialsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
      nic: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      role: ['user', [Validators.required]],
    });
  }

  register() {
    this.authService.register(this.credentialsForm.value).subscribe((res) => {
      // Call Login to automatically login the new user
      this.presentToast();
      this.router.navigate(['/login']);
    },(error) => {
      // console.log('Error in file upload', JSON.stringify(error));
      this.errorToast();
    }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account succesfully created.',
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Account not Created !',
      duration: 3000,
      color: 'red',
    });
    toast.present();
  }
}
