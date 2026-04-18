import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Diagnosis } from '../../../models/diagnosis.model';
import { AuthService } from '../../../core/services/auth.service';
import { SpecialistService } from '../../../features/specialist/specialist.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-diagnosis-card',
  imports: [
    MatProgressSpinner,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './diagnosis-card.component.html',
  styleUrl: './diagnosis-card.component.css'
})
export class DiagnosisCardComponent {
  @Input() diagnosis!: Diagnosis;

  private auth = inject(AuthService);
  private specialistService = inject(SpecialistService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);

  editing = false;
  submitting = false;
  form!: FormGroup;

  get canEdit(): boolean {
    return this.auth.getRole() === 'ROLE_SPECIALIST';
  }

  startEdit() {
    this.editing = true;
    this.form = this.fb.group({
      name: [this.diagnosis.name ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: [this.diagnosis.description ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      treatment: [this.diagnosis.treatment ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    });
  }

  cancelEdit() {
    this.editing = false;
  }

  save() {
    if (!this.form.valid) return;
    const appointmentId = this.route.snapshot.paramMap.get('id');
    if (!appointmentId) return;
    this.submitting = true;
    this.specialistService.updateDiagnosis(appointmentId, this.form.value).subscribe({
      next: () => {
        const v = this.form.value;
        this.diagnosis = {
          ...this.diagnosis,
          name: v.name,
          description: v.description,
          treatment: v.treatment,
        };
        this.editing = false;
        this.submitting = false;
        this.toast.success('Diagnosis updated');
      },
      error: () => {
        this.submitting = false;
        this.toast.error('Could not update diagnosis');
      }
    });
  }
}
