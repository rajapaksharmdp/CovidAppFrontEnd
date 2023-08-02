import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/api/user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { User } from '../models/data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  userForm!: FormGroup;
  currentStep: number = 1;
  capturedImage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private camera: Camera,
    private file: File
  ) {}

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
      dose1: ['', Validators.required],
      Dose1_date: ['', Validators.required],
      dose2: ['', Validators.required],
      Dose2_date: ['', Validators.required],
      dose3: ['', Validators.required],
      Dose3_date: ['', Validators.required],
      image: [''],
    });
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    // Check if the form is valid before submitting
    if (this.userForm.valid) {
      // Get the form data from the userForm
      const userData: User = {
        ...this.userForm.value,
        image: this.capturedImage,
      };

      // Call your service to create the user
      this.userService
        .createUser(userData)
        .pipe(
          catchError((error) => {
            console.error('Error occurred while creating user:', error);

            return throwError(error);
          })
        )
        .subscribe((data: any) => {
          console.log('data', JSON.stringify(data));

          this.router.navigate(['/showusers']);
        });
    } else {
      console.log('Please complete all required fields.');
    }
  }

  async takePicture() {
    try {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      };

      const imageData = await this.camera.getPicture(options);
      const imageFileName = imageData.substr(imageData.lastIndexOf('/') + 1);
      const imageFilePath = imageData.substr(0, imageData.lastIndexOf('/') + 1);

      // Convert the FILE_URI to a BASE64 data URL
      this.file
        .readAsDataURL(imageFilePath, imageFileName)
        .then((base64Image) => {
          // Set the captured image to your model or form control
          this.capturedImage = base64Image;
          // If you want to upload the image to the server, you can do it here
        });
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }
}