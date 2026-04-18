import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Prescription} from '../../../models/prescription.model';
import {AuthService} from '../../../core/services/auth.service';
import {DoctorService} from '../../../features/doctor/doctor.service';
import {ToastService} from '../../../core/services/toast.service';
import {QrCodeComponent} from '../qr-code/qr-code.component';
import {BarcodeComponent} from '../barcode/barcode.component';
import {MatIconModule} from '@angular/material/icon';
import {PrescriptionStatusModel} from '../../../models/prescription-status.model';

type CodeMode = 'qr' | 'barcode';

@Component({
  selector: 'app-prescription-details',
  imports: [
    QrCodeComponent,
    BarcodeComponent,
    MatIconModule,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './prescription-details.component.html',
  styleUrl: './prescription-details.component.css'
})
export class PrescriptionDetailsComponent implements OnInit {
  @Input() prescription!: Prescription;
  @Input() isDoctor: boolean = false;
  @Output() validate = new EventEmitter<boolean>();
  @Output() prescriptionUpdated = new EventEmitter<Prescription>();
  @Output() prescriptionCanceled = new EventEmitter<string>();
  PrescriptionStatus = PrescriptionStatusModel;

  authService = inject(AuthService);
  private doctorService = inject(DoctorService);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);
  userRole: String = "ROLE_GUEST";
  uniqueCodeText = "";
  redeemed = false;
  codeMode: CodeMode = 'qr';

  editing = false;
  editForm!: FormGroup;
  confirmCancel = false;
  submitting = false;

  ngOnInit() {
    this.userRole = this.authService.getRole();
    this.uniqueCodeText = this.prescription.id + "-" + this.authService.getUserId();
  }

  get statusClass(): string {
    const s = this.prescription?.status?.toString().toLowerCase() ?? '';
    return `prescription-status prescription-status--${s}`;
  }

  get canDoctorManage(): boolean {
    return this.userRole === 'ROLE_DOCTOR'
      && this.prescription?.status === this.PrescriptionStatus.ACTIVE;
  }

  setCodeMode(mode: CodeMode) {
    this.codeMode = mode;
  }

  emitValidation() {
    this.validate.emit(true);
  }

  startEdit() {
    this.editing = true;
    this.editForm = this.fb.group({
      medicine: [this.prescription.medicine ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      frequency: [this.prescription.frequency ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    if (!this.editForm.valid) return;
    const patientId = Number(this.prescription.patientId);
    const prescriptionId = this.prescription.id.toString();
    this.submitting = true;
    this.doctorService.updatePrescription(patientId, prescriptionId, this.editForm.value).subscribe({
      next: (updated) => {
        Object.assign(this.prescription, updated);
        this.editing = false;
        this.submitting = false;
        this.prescriptionUpdated.emit(updated);
        this.toast.success('Prescription updated');
      },
      error: () => {
        this.submitting = false;
        this.toast.error('Could not update prescription');
      }
    });
  }

  askCancel() {
    this.confirmCancel = true;
  }

  dismissCancel() {
    this.confirmCancel = false;
  }

  confirmCancelPrescription() {
    const patientId = Number(this.prescription.patientId);
    const prescriptionId = this.prescription.id.toString();
    this.submitting = true;
    this.doctorService.cancelPrescription(patientId, prescriptionId).subscribe({
      next: (updated) => {
        Object.assign(this.prescription, updated);
        this.confirmCancel = false;
        this.submitting = false;
        this.prescriptionCanceled.emit(prescriptionId);
        this.toast.success('Prescription canceled');
      },
      error: () => {
        this.submitting = false;
        this.toast.error('Could not cancel prescription');
      }
    });
  }
}
