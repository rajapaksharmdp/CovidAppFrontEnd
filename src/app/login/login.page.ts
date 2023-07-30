import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      nic: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
    this.login();
  }

  login() {
    this.router.navigate(['/home']);
  }
}
