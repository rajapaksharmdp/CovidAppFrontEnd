import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ZBar,ZBarOptions } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent {
  scannedData: any;
  zbarOptions:any;
  scannedResult:any;

  constructor(private barcodeScanner: BarcodeScanner, private zbar: ZBar) {
    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }
  }

  scanQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scannedData = barcodeData.text;
      // Implement the logic to process the scanned data
    });
  }

  scanCode(){
    this.zbar.scan(this.zbarOptions)
   .then(result => {
      console.log(result); // Scanned code
      this.scannedResult = result;
   })
   .catch(error => {
      alert(error); // Error message
   });
  }
}
