import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatButtonModule } from '@angular/material/button';
import { Prescription } from '../../../../models/prescription.model';
import { PharmacistService } from '../../pharmacist.service';
import { PrescriptionDetailsComponent } from '../../../../shared/components/prescription-details/prescription-details.component';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pharmacist-scan',
  imports: [
    ZXingScannerModule,
    MatButtonModule,
    PrescriptionDetailsComponent,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './pharmacist-scan.component.html',
  styleUrl: './pharmacist-scan.component.css'
})
export class PharmacistScanComponent {

  pharmacistService = inject(PharmacistService)

  qrResultString: string | null = null;
  prescriptionId = ""
  patientId = 0
  prescription: Prescription | null = null
  fetched = false
  subscription: Subscription | undefined;

  clearResult(): void {
    this.qrResultString = null;
    this.prescription = null
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.prescriptionId = this.qrResultString.split('-')[0]
    this.patientId = parseInt(this.qrResultString.split('-')[1])
    if (this.prescriptionId.length == 12 && this.patientId != 0)
      this.getPrescription()
  }

  getPrescription() {
    this.subscription = this.pharmacistService.getPrescription(this.prescriptionId, this.patientId).subscribe({
      next: (data: Prescription) => {
        this.prescription = data;
        this.fetched = true;
      },
      error: (error) => {
        console.error('Error fetching prescription data:', error);
      },
      complete: () => {
        console.log('Prescription data fetching complete.');
        console.log(this.prescription?.status);
      }
    });
  }

  validatePrescription(validate:boolean){
    if(validate){
      this.subscription = this.pharmacistService.validatePrescription(this.prescriptionId, this.patientId).subscribe({
        next: (data: Prescription) => {
          this.prescription = data;
          this.fetched = true;
        },
        error: (error) => {
          console.error('Error fetching prescription data:', error);
        },
        complete: () => {
          console.log('Prescription data fetching complete.');
          console.log(this.prescription?.status);
        }
      });
    }
  }

}
