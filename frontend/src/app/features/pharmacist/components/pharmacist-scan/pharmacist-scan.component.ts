import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {BarcodeFormat} from '@zxing/library';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Prescription} from '../../../../models/prescription.model';
import {PharmacistService} from '../../pharmacist.service';
import {PrescriptionDetailsComponent} from '../../../../shared/components/prescription-details/prescription-details.component';
import {Subscription} from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pharmacist-scan',
  imports: [
    ZXingScannerModule,
    MatIconModule,
    MatIconButton,
    PrescriptionDetailsComponent,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './pharmacist-scan.component.html',
  styleUrl: './pharmacist-scan.component.css'
})
export class PharmacistScanComponent {
  pharmacistService = inject(PharmacistService);

  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.PDF_417,
    BarcodeFormat.ITF,
    BarcodeFormat.AZTEC,
  ];

  qrResultString: string | null = null;
  prescriptionId = "";
  patientId = 0;
  prescription: Prescription | null = null;
  fetched = false;
  subscription: Subscription | undefined;

  clearResult(): void {
    this.qrResultString = null;
    this.prescription = null;
    this.fetched = false;
  }

  onCodeResult(resultString: string) {
    if (this.qrResultString === resultString) return;
    this.qrResultString = resultString;
    this.fetched = false;
    this.prescription = null;
    this.prescriptionId = resultString.split('-')[0];
    this.patientId = parseInt(resultString.split('-')[1]);
    if (this.prescriptionId.length == 12 && this.patientId != 0) {
      this.getPrescription();
    }
  }

  getPrescription() {
    this.subscription = this.pharmacistService.getPrescription(this.prescriptionId, this.patientId).subscribe({
      next: (data: Prescription) => {
        this.prescription = data;
        this.fetched = true;
      },
      error: () => {
        this.fetched = true;
      }
    });
  }

  validatePrescription(validate: boolean) {
    if (validate) {
      this.subscription = this.pharmacistService.validatePrescription(this.prescriptionId, this.patientId).subscribe({
        next: (data: Prescription) => {
          this.prescription = data;
          this.fetched = true;
        },
        error: (error) => {
          console.error('Error validating prescription:', error);
        }
      });
    }
  }
}
