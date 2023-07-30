import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  ActionSheetController,
  IonContent,
  IonSlides,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompressImageService } from '../services/compress-image.service';
import { take } from 'rxjs/operators';
import { UserService } from '../services/api/user.service';
import { User } from '../models/user';
import { ImageService } from '../services/api/image.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const _USER_NIC = 'user_nic';

@Component({
  selector: 'app-add-new-certificate',
  templateUrl: './add-new-certificate.page.html',
  styleUrls: ['./add-new-certificate.page.scss'],
})
export class AddNewCertificatePage implements OnInit {
  user: User = new User();

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('personalFormRef', { static: false }) personalFormRef: NgForm;
  @ViewChild('vaccineFormRef', { static: false }) vaccineFormRef: NgForm;
  @ViewChild('submissionFormRef', { static: false }) submissionFormRef: NgForm;
  @ViewChild('documentsFormRef', { static: false }) documentsFormRef: NgForm;

  // public order: any = {
  //   id: 1,
  //   items: [
  //     {
  //       id: 1,
  //       name: 'Denim T-Shirt',
  //       amount: 15.0,
  //     },
  //     {
  //       id: 1,
  //       name: 'Denim Pants',
  //       amount: 5.0,
  //     },
  //     {
  //       id: 1,
  //       name: 'Black T-Shirt',
  //       amount: 5.0,
  //     },
  //   ],
  //   subtotal: 25.0,
  //   shippingFee: 5.0,
  //   total: 30.0,
  // };

  public personalForm: FormGroup;
  public submissionForm: FormGroup;
  public vaccineForm: FormGroup;
  public documentsForm: FormGroup;

  public imagePath: SafeResourceUrl;

  public items = [];

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;
  imgData: string;
  img_destination: string;
  img_filename: string;
  id: any;
  data: any;
  userNic: any;

  vaccardfront: any;
  vaccardback: any;
  nicfront: any;
  nicback: any;
  photo: any;
  count: any = 0;

  vcfront: boolean;
  vcback: boolean;
  idfront: boolean;
  idback: boolean;
  imgphoto: boolean;

  public checked = false;

  get FirstName(): AbstractControl {
    return this.personalForm.get('first_name');
  }

  get LastName(): AbstractControl {
    return this.personalForm.get('last_name');
  }

  get NIC(): AbstractControl {
    return this.personalForm.get('nic');
  }

  get DOB(): AbstractControl {
    return this.personalForm.get('dob');
  }

  get Phone(): AbstractControl {
    return this.personalForm.get('phone');
  }

  get Address1(): AbstractControl {
    return this.personalForm.get('address1');
  }

  get Address2(): AbstractControl {
    return this.personalForm.get('address2');
  }

  get Town(): AbstractControl {
    return this.personalForm.get('town');
  }

  get District(): AbstractControl {
    return this.personalForm.get('district');
  }

  get vaccineDose1Name(): AbstractControl {
    return this.vaccineForm.get('dose1');
  }

  get vaccineDose1Date(): AbstractControl {
    return this.vaccineForm.get('Dose1_date');
  }

  get vaccineDose2Name(): AbstractControl {
    return this.vaccineForm.get('dose2');
  }

  get vaccineDose2Date(): AbstractControl {
    return this.vaccineForm.get('Dose2_date');
  }

  get vaccineDose3Name(): AbstractControl {
    return this.vaccineForm.get('dose3');
  }

  get vaccineDose3Date(): AbstractControl {
    return this.vaccineForm.get('Dose3_date');
  }

  // get shippingDeliveryTime(): AbstractControl {
  //   return this.vaccineForm.get('delivery_time');
  // }

  // get paymentNumber(): AbstractControl {
  //   return this.submissionForm.get('number');
  // }

  // get paymentExpiration(): AbstractControl {
  //   return this.submissionForm.get('expiration');
  // }

  // get paymentCvv(): AbstractControl {
  //   return this.submissionForm.get('cvv');
  // }

  croppedImagepath = '';
  isLoading = false;
  filename = '';

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private compressImage: CompressImageService,
    private userservice: UserService,
    private imageservice: ImageService,
    private camera: Camera,
    private file: File,
    public actionSheetController: ActionSheetController,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    public loadingController: LoadingController,
  ) {
    // console.log(this.router.getCurrentNavigation().extras.state.data);

    //  console.log(`data`, this.data)
    this.storage.get(_USER_NIC).then((res) => {
      this.userNic = res;
    });
  }

  ngOnInit() {
    this.data = this.router.getCurrentNavigation().extras.state.data[0];
    this.setupForm();
    this.buildSlides();
    this.items = [
      'Moderna',
      'Pfizer',
      'Sputnik V',
      'AstraZeneca',
      'Covishield',
      'Sinopharm',
      'Sinovac',
    ];
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = [
      'Personal',
      'Vaccine',
      'Confirmation',
      'Documents',
      'Submission',
    ];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    // console.log(`this.data`, this.data)
    this.personalForm = new FormGroup({
      first_name: new FormControl(this.data.first_name, Validators.required),
      last_name: new FormControl(this.data.last_name, Validators.required),
      nic: new FormControl(this.data.nic, Validators.required),
      dob: new FormControl(this.data.dob, Validators.required),
      phone: new FormControl(this.data.phone, Validators.required),
      address1: new FormControl(this.data.address1, Validators.required),
      address2: new FormControl(this.data.address2, Validators.required),
      town: new FormControl(this.data.town, Validators.required),
      district: new FormControl(this.data.district, Validators.required),
    });

    this.vaccineForm = new FormGroup({
      dose1: new FormControl(this.data.dose1, Validators.required),
      Dose1_date: new FormControl(this.data.Dose1_date, Validators.required),
      dose2: new FormControl(this.data.dose2),
      Dose2_date: new FormControl(this.data.Dose2_date),
      dose3: new FormControl(this.data.dose3),
      Dose3_date: new FormControl(this.data.Dose3_date),
    });

    this.documentsForm = new FormGroup({
      // vaccardfront: new FormControl('', Validators.required),
      // userphoto: new FormControl('', Validators.required),
    });

    this.submissionForm = new FormGroup({
      vaccardfront: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      expiration: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    });
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {
    if (this.currentSlide === 'Personal') {
      this.personalFormRef.onSubmit(undefined);

      if (this.personalForm.valid) {
        this.user.first_name = this.personalForm.controls.first_name.value;
        this.user.last_name = this.personalForm.controls.last_name.value;
        this.user.nic = this.personalForm.controls.nic.value;
        this.user.dob = this.personalForm.controls.dob.value;
        this.user.phone = this.personalForm.controls.phone.value;
        this.user.address1 = this.personalForm.controls.address1.value;
        this.user.address2 = this.personalForm.controls.address2.value;
        this.user.town = this.personalForm.controls.town.value;
        this.user.district = this.personalForm.controls.district.value;
        this.user.primarynic = this.userNic;

        // console.log(`this.user`, this.user)
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    } else if (this.currentSlide === 'Vaccine') {
      this.vaccineFormRef.onSubmit(undefined);

      if (this.vaccineForm.valid) {
        this.user.dose1 = this.vaccineForm.controls.dose1.value;
        this.user.Dose1_date = this.vaccineForm.controls.Dose1_date.value;
        this.user.dose2 = this.vaccineForm.controls.dose2.value;
        this.user.Dose2_date = this.vaccineForm.controls.Dose2_date.value;
        this.user.dose3 = this.vaccineForm.controls.dose3.value;
        this.user.Dose3_date = this.vaccineForm.controls.Dose3_date.value;
        // console.log(`this.user`, this.user)
        this.ionSlides.slideNext();
        this.ionContent.scrollToPoint;
      }
    } else if (this.currentSlide === 'Documents') {
      // this.documentsFormRef.onSubmit(undefined);

      if (this.count >= 5) {
        // console.log(`this.user`, JSON.stringify(this.user));
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      } else {
        this.nexterrorToast();
      }
    } else if (this.currentSlide === 'Submission') {
      this.submissionFormRef.onSubmit(undefined);

      if (this.submissionForm.valid) {
        this.navCtrl.navigateRoot('/thanks', {
          animated: true,
          animationDirection: 'forward',
        });
      }
    } else {
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  OnSubmit() {
    this.userservice.createUser(this.user).subscribe((data: any) => {
      console.log(`data`, JSON.stringify(data));
      this.router.navigate(['/my-certificates']);
    });
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

  // upload(event) {
  //   let image: File = event.target.files[0];
  //   // console.log(`Image size before compressed: ${image.size} bytes.`);

  //   this.compressImage
  //     .compress(image)
  //     .pipe(take(1))
  //     .subscribe((compressedImage) => {
  //       console.log(
  //         `Image size after compressed: ${compressedImage.size} bytes.`
  //       );
  //       // now you can do upload the compressed image
  //     });
  // }

  // async chooseImage(source: CameraOptions) {

  //   try {

  //     const image = await CameraOptions.getPhoto({
  //       quality: 70,
  //       width: 600,
  //       height: 600,
  //       preserveAspectRatio: true,
  //       allowEditing: true,
  //       correctOrientation: true,
  //       source: source,
  //       resultType: CameraOriginal.Uri,
  //     });

  //     const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
  //     this.imagePath = safeUrl;

  //     const response = await fetch(image.webPath);
  //     const blob = await response.blob();

  //     const base64 = await this.convertBlobToBase64(blob) as string;

  //     // Send encoded string to server...

  //   } catch (error) {
  //     console.warn(error);
  //   }

  // }

  // async presentActionSheet() {

  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Choose an option',
  //     buttons: [{
  //       text: 'Photo Library',
  //       handler: () => {
  //         this.chooseImage(CameraOriginal.Photos);
  //       }
  //     }, {
  //       text: 'Camera',
  //       handler: () => {
  //         this.chooseImage(CameraOriginal.Camera);
  //       }
  //     }, {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }]
  //   });

  //   return await actionSheet.present();
  // }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Image succesfully uploaded.',
      duration: 2000,
      color: 'secondary',
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Image not uploaded !',
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }

  async nexterrorToast() {
    const toast = await this.toastController.create({
      message: 'Please upload required images !',
      duration: 3000,
      color: 'tertiary',
    });
    toast.present();
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  read(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const blob = new Blob([reader.result], {
        type: file.type,
      });
      const formData = new FormData();
      formData.append('name', 'MyImageBlob');
      formData.append('file', blob, file.name);

      this.imageservice.imageUpload(formData).subscribe(
        (data: any) => {
          // console.log('Image uplosde', JSON.stringify(data));
          // console.log('Image uplosde2', data);
          this.img_destination = JSON.stringify(data.path);
          this.img_filename = JSON.stringify(data.filename);

          if (this.id == 3) {
            this.user.idimg1_destination = JSON.parse(this.img_destination);
            this.user.idimg1_filename = JSON.parse(this.img_filename);
          } else if (this.id == 4) {
            this.user.idimg2_destination = JSON.parse(this.img_destination);
            this.user.idimg2_filename = JSON.parse(this.img_filename);
          } else if (this.id == 1) {
            this.user.vcardimg1_destination = JSON.parse(this.img_destination);
            this.user.vcardimg1_filename = JSON.parse(this.img_filename);
          } else if (this.id == 2) {
            this.user.vcardimg2_destination = JSON.parse(this.img_destination);
            this.user.vcardimg2_filename = JSON.parse(this.img_filename);
          } else if (this.id == 5) {
            this.user.userimg_destination = JSON.parse(this.img_destination);
            this.user.userimg_filename = JSON.parse(this.img_filename);
          }

          this.presentToast();
        },
        (error) => {
          console.log('Error in file upload', JSON.stringify(error));
          this.errorToast();
        }
      );
    };
    reader.readAsArrayBuffer(file);
  }

  fileInputClick($event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  reply_click(clicked_id) {
    this.id = clicked_id;
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 40,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1280,
      targetHeight: 1080,
      correctOrientation: true,
      // allowEdit: true
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.present();
        // imageData is either a base64 encoded string or a file URI
        // this.croppedImagepath = "data:image/jpeg;base64;"+imageData;
        this.file
          .resolveLocalFilesystemUrl(imageData)
          .then((entry: FileEntry) => {
            entry.file((file) => {
              if (this.count >= 5) {
                this.count = 0;
              }
              console.log('File Picked', this.formatBytes(file.size));
              this.filename = file.name;
              if (this.id == 1) {
                // console.log(`vaccardfront`);
                this.vaccardfront = this.filename;
                this.count = this.count + 1;
                this.vcfront = true;
              } else if (this.id == 2) {
                // console.log(`vaccardback`);
                this.vaccardback = this.filename;
                this.count = this.count + 1;
                this.vcback = true;
              } else if (this.id == 3) {
                // console.log(`nicfront`);
                this.nicfront = this.filename;
                this.count = this.count + 1;
                this.idfront = true;
              } else if (this.id == 4) {
                // console.log(`nicback`);
                this.nicback = this.filename;
                this.count = this.count + 1;
                this.idback = true;
              } else if (this.id == 5) {
                // console.log(`photo`);
                this.photo = this.filename;
                this.count = this.count + 1;
                this.imgphoto = true;
              }
              console.log(`this.count`, this.count);
              this.read(file);
              this.dismiss();
            });
          });
      },
      (err) => {
        // Handle error
        console.log('err in picking image', err);
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  originalOrder = (): number => {
    return 0;
  };

  async present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        // duration: 5000,
        message: 'Please wait...',
        spinner: 'crescent',
      })
      .then((a) => {
        a.present().then(() => {
          // console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() =>
       console.log('dismissed')
       );
  }
}
