import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {Prescription} from '../../../models/prescription.model';
import {AuthService} from '../../../core/services/auth.service';
import {QrCodeComponent} from '../qr-code/qr-code.component';
import {MatIconModule} from '@angular/material/icon';
import {PrescriptionStatusModel} from '../../../models/prescription-status.model';

@Component({
  selector: 'app-prescription-details',
  imports: [
    QrCodeComponent,
    MatIconModule,
    NgClass
  ],
  templateUrl: './prescription-details.component.html',
  styleUrl: './prescription-details.component.css'
})
export class PrescriptionDetailsComponent implements OnInit {
  @Input() prescription!: Prescription;
  @Input() isDoctor: boolean = false;
  @Output() validate = new EventEmitter<boolean>();
  PrescriptionStatus = PrescriptionStatusModel;

  authService = inject(AuthService);
  userRole: String = "ROLE_GUEST";
  uniqueQrText = "";
  redeemed = false;

  ngOnInit() {
    this.userRole = this.authService.getRole();
    this.uniqueQrText = this.prescription.id + "-" + this.authService.getUserId();
  }

  get statusClass(): string {
    const s = this.prescription?.status?.toString().toLowerCase() ?? '';
    return `prescription-status prescription-status--${s}`;
  }

  emitValidation() {
    this.validate.emit(true);
  }
}
