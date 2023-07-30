import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  credentialsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      currentpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', [Validators.required]],
    });
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
