import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Prescription} from '../../../models/prescription.model';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {AuthService} from '../../../core/services/auth.service';
import {QrCodeComponent} from '../qr-code/qr-code.component';
import {MatButtonModule} from '@angular/material/button';
import {PrescriptionStatusModel} from '../../../models/prescription-status.model';

@Component({
  selector: 'app-prescription-details',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    QrCodeComponent,
    MatButtonModule
  ],
  templateUrl: './prescription-details.component.html',
  styleUrl: './prescription-details.component.css'
})
export class PrescriptionDetailsComponent implements OnInit {
  @Input() prescription!: Prescription;
  @Input() isDoctor: boolean = false;
  @Output() validate = new EventEmitter<boolean>()
  PrescriptionStatus = PrescriptionStatusModel

  authService = inject(AuthService)
  userRole: String = "ROLE_GUEST"
  uniqueQrText = ""
  redeemed = false

  ngOnInit() {
    this.userRole = this.authService.getRole()
    this.uniqueQrText = this.prescription.id + "-" + this.authService.getUserId()
  }

  emitValidation() {
    this.validate.emit(true)
  }
}
