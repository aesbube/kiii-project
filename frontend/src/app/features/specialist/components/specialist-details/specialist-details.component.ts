import {Component, inject, OnInit} from '@angular/core';
import {SpecialistService} from '../../specialist.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-specialist-details',
  templateUrl: './specialist-details.component.html',
  styleUrl: './specialist-details.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatIconButton,
    RouterLink,
    MatProgressSpinner,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ]
})
export class SpecialistDetailsComponent implements OnInit {
  service = inject(SpecialistService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  today: Date = new Date();
  specialistDate: string | null = null;

  ngOnInit(): void {
    this.service.getSpecialistDetails().subscribe((specialist) => {
      this.specialistDate = specialist.birthDate ? specialist.birthDate.toString() : null;
      this.form = this.fb.group({
        username: [{value: specialist.username, disabled: true}],
        email: [{value: specialist.email, disabled: true}],
        phone: [specialist.phone],
        name: [specialist.name],
        surname: [specialist.surname],
        birthDate: [specialist.birthDate],
        address: [specialist.address ?? ''],
        specialty: [specialist.specialty],
        licenseNumber: [specialist.licenseNumber],
        yearsOfExperience: [specialist.yearsOfExperience],
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const updatedSpecialist = this.form.getRawValue();
      updatedSpecialist.birthDate = this.formatDate(updatedSpecialist.birthDate);
      this.service.updateSpecialistDetails(updatedSpecialist).subscribe({
        next: (ok) => {
          console.log('Update successful', ok);
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    if (this.specialistDate && this.specialistDate === date.toString()) {
      return this.specialistDate;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
