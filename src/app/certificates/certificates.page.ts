import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { User } from '../models/user';
import { UserService } from '../services/api/user.service';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.page.html',
  styleUrls: ['./certificates.page.scss'],
})
export class CertificatesPage implements OnInit {
  id: any;
  sub: any;
  data: User = new User();
  elementType = NgxQrcodeElementTypes.CANVAS;
  value = this.data._id;
  isLoading = false;

  dose1only = false;
  dose1and2only = false;

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute,
    private file: File,
    private fileOpener: FileOpener,
    private pdfGenerator: PDFGenerator,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    this.getid();
  }

  test: string;
  htmlSample: any;

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetch();
  }

  getid() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.test = this.id;
      // console.log(`idddddddddddddddddddddddd`);
    });
  }

  async fetch() {
    this.userservice.getUserbyId(this.id).subscribe((res) => {
      this.data = JSON.parse(JSON.stringify(res));
      // console.log(`res`, this.data);
      if (this.data.dose2 == undefined) {
        this.dose1only = true;
      } else if (this.data.dose3 == undefined) {
        this.dose1and2only = true;
      }
      //  var value = this.data._id;
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Download Certificate',
      message:
        '<ion-icon  class="custom-icon-success"  name="download-outline"></ion-icon> <br> <h2> Do you want download this certificate?</h2>',
      buttons: [
        {
          text: 'Yes',

          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            this.getPDF();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            // console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  // getPDF() {

  //   this.htmlSample = "<html><h1>{{this.data.first_name}}</h1></html>";
  //   this.htmlSample = document.getElementById('print-pdf').innerHTML;
  //   let options = {
  //     documentSize: 'A4',
  //     type: 'share'
  //   }

  //   this.pdfGenerator.fromData(this.htmlSample, options).
  //     then(resolve => {
  //       console.log(resolve);

  //     }
  //     ).catch((err) => {
  //       console.error(err);
  //     });
  // }

  getPDF() {
    this.present();
    const pdfBlock = document.getElementById('printpdf');

    var titleFontSize = 32;
    var mediumFontSize = 14;
    var smallFont = 12;
    var index = 10;
    var gap = 8;

    let scale = 5;

    const options = {
      background: 'white',
      height: pdfBlock.clientHeight * scale,
      width: pdfBlock.clientWidth * scale,
      quality: 1,
      style: { transform: 'scale(' + scale + ')', transformOrigin: 'top left' },
      cacheBust: true,
    };

    domtoimage
      .toPng(pdfBlock, options)
      .then((fileUrl) => {
        var doc = new JSPDF('p', 'mm', 'a4');

        let width = doc.internal.pageSize.getWidth();
        let height = doc.internal.pageSize.getHeight();

        doc.rect(
          10,
          10,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 20,
          'S'
        );
        doc.setFillColor(204, 0, 204, 0);
        doc.rect(10, 10, 190, index + 30, 'F');
        doc.setFontSize(titleFontSize);
        doc.setTextColor('white');
        doc.text(
          'Digital Covid-19 Certificate',
          doc.internal.pageSize.getWidth() / 2,
          index + 20,
          {
            align: 'center',
          }
        );

        doc.setFillColor(204, 204, 204, 0);
        doc.rect(10, 40, 190, index + 68, 'F');

        doc.addImage(fileUrl, 'PNG', 0, -20, 210, 297);

        doc.setFillColor(204, 0, 204, 0);
        doc.rect(10, 280, 190, 7, 'F');
        doc.setFontSize(smallFont);
        doc.setTextColor('black');
        doc.text(
          '© 2022 Software Engineering Teaching Unit, University of Kelaniya. All Rights Reserved.',
          doc.internal.pageSize.getWidth() / 2,
          index + 275,
          {
            align: 'center',
          }
        );

        let docRes = doc.output();
        let buffer = new ArrayBuffer(docRes.length);
        let array = new Uint8Array(buffer);
        for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
        }

        const directory = this.file.dataDirectory;
        const fileName = 'user-data.pdf';

        let options: IWriteOptions = {
          replace: true,
        };

        this.file
          .checkFile(directory, fileName)
          .then((res) => {
            this.file
              .writeFile(directory, fileName, buffer, options)
              .then((res) => {
                console.log('File generated' + JSON.stringify(res));
                this.dismiss();
                this.fileOpener
                  .open(this.file.dataDirectory + fileName, 'application/pdf')
                  .then(() => console.log('File is exported'))
                  .catch((e) => console.log(e));
              })
              .catch((error) => {
                console.log(JSON.stringify(error));
              });
          })
          .catch((error) => {
            this.file
              .writeFile(directory, fileName, buffer)
              .then((res) => {
                console.log('File generated' + JSON.stringify(res));
                this.fileOpener
                  .open(this.file.dataDirectory + fileName, 'application/pdf')
                  .then(() => console.log('File exported'))
                  .catch((e) => console.log(e));
              })
              .catch((error) => {
                console.log(JSON.stringify(error));
              });
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // getPDF() {
  //   var pdf = new jsPDF({
  //     orientation: 'p',
  //     unit: 'mm',
  //     format: [210, 297],
  //   });

  //   var titleFontSize = 16;
  //   var mediumFontSize = 14;
  //   var smallFont = 12;
  //   var index = 10;
  //   var gap = 8;

  //   pdf.rect(
  //     5,
  //     5,
  //     pdf.internal.pageSize.width - 10,
  //     pdf.internal.pageSize.height - 10,
  //     'S'
  //   );
  //   var image = new Image();
  //   image.src = '../../assets/images/bg.svg';
  //   pdf.addImage(image, 'jpg', 28, index, 160, 30); /// x , y , width , height
  //   pdf.setFontSize(titleFontSize);
  //   pdf.text('Digital Covid-19 Certificate', pdf.internal.pageSize.getWidth() / 2, (index += 35), {
  //     align: 'center',
  //   });

  //   pdf.save('converteddoc.pdf');
  // }

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
      .then(() => console.log('dismissed'));
  }
}
