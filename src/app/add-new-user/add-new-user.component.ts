import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {

    userForm!: FormGroup;
    currentStep: number = 1;
  
    constructor(private formBuilder: FormBuilder, private userService: UserService) {}
  
    ngOnInit() {
      this.userForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        nic: ['', Validators.required],
        dob: ['', Validators.required],
        phone: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        town: ['', Validators.required],
        district: ['', Validators.required],
        dose1: [''],
        Dose1_date: [''],
        dose2: [''],
        Dose2_date: [''],
        dose3: [''],
        Dose3_date: [''],
      });
    }
  
    nextStep() {
      this.currentStep++;
    }
  
    prevStep() {
      this.currentStep--;
    }
  
    onSubmit() {
      // Save the form data to the user service
      this.userService.user = { ...this.userForm.value };
  
      // Perform the final submission or any other actions here
      // For example, you can send the user data to the backend API.
  
      // Reset the form and navigate back to the home page or any other page.
      this.userForm.reset();
      this.currentStep = 1; // Reset to the first step
      // this.router.navigate(['/home']);
    }
 
}