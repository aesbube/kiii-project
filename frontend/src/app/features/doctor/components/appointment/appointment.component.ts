import {Component, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Appointment} from '../../../../models/appointment.model';
import {Specialist} from '../../../../models/specialist.model';
import {OccupyAppointment} from '../../../../models/occupy-appointment.model';
import {DoctorService} from '../../doctor.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatCard,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinner,
    RouterLink
  ]
})
export class AppointmentComponent implements OnInit {
  service = inject(DoctorService);

  specialists: Specialist[] = [];
  selectedSpecialist: Specialist | null = null;

  value: Date | null = null;
  time: string = '';

  availableAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  availableDates: Set<string> = new Set();
  availableTimesByDate: Map<string, string[]> = new Map();
  appointmentsByDateTime: Map<string, Appointment> = new Map();
  route = inject(ActivatedRoute);

  loading = false;
  appointmentsLoaded = false;
  patientId = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id') || '';
      if (!this.patientId) {
        console.error('Patient ID is required');
        return;
      }
    })
    this.loadSpecialists();
  }

  loadSpecialists() {
    this.loading = true;
    this.service.getAllSpecialists().subscribe({
      next: (specialists) => {
        this.specialists = specialists;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load specialists:', err);
        this.loading = false;
      }
    });
  }

  onSpecialistChange(specialist: Specialist) {
    this.selectedSpecialist = specialist;
    this.value = null;
    this.time = '';
    this.selectedAppointment = null;
    this.loadAppointments();
  }

  loadAppointments() {
    if (!this.selectedSpecialist) return;

    this.loading = true;
    this.appointmentsLoaded = false;

    this.service.getFreeAppointments(this.selectedSpecialist.username as string).subscribe({
      next: (appointments) => {
        this.availableAppointments = appointments;
        this.processAppointments();
        this.loading = false;
        this.appointmentsLoaded = true;
        console.log('Available appointments:', this.availableAppointments);
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
        this.loading = false;
        this.appointmentsLoaded = true;
      }
    });
  }

  processAppointments() {
    this.availableDates = new Set();
    this.availableTimesByDate = new Map();
    this.appointmentsByDateTime = new Map();

    for (const appointment of this.availableAppointments) {
      this.availableDates.add(appointment.date);

      const times = this.availableTimesByDate.get(appointment.date) || [];
      times.push(appointment.time);
      this.availableTimesByDate.set(appointment.date, times);

      const key = `${appointment.date}_${appointment.time}`;
      this.appointmentsByDateTime.set(key, appointment);
    }
  }

  onDateChange(date: Date) {
    if (!date) return;
    this.value = date;
    this.time = '';
    this.selectedAppointment = null;
  }

  onTimeChange(timeStr: string) {
    this.time = timeStr;
    if (!this.value || !this.time) return;

    const dateStr = this.formatDate(this.value);
    const key = `${dateStr}_${this.time}`;
    this.selectedAppointment = this.appointmentsByDateTime.get(key) || null;
  }

  scheduleAppointment() {
    if (!this.selectedAppointment || !this.patientId) return;

    const occupyAppointment: OccupyAppointment = {
      appointmentId: this.selectedAppointment.id,
      scheduleId: this.selectedAppointment.scheduleId,
      refNumber: this.selectedAppointment.refNumber
    };

    this.loading = true;

    this.service.scheduleAppointment(this.patientId, occupyAppointment).subscribe({
      next: (response) => {
        console.log('Appointment scheduled successfully:', response);
        this.loading = false;
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to schedule appointment:', err);
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.selectedSpecialist = null;
    this.value = null;
    this.time = '';
    this.selectedAppointment = null;
    this.availableAppointments = [];
    this.appointmentsLoaded = false;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isDateAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    const dateStr = this.formatDate(date);
    return this.availableDates.has(dateStr);
  }

  getAvailableTimesForSelectedDate(): string[] {
    if (!this.value) return [];
    const dateStr = this.formatDate(this.value);
    return this.availableTimesByDate.get(dateStr) || [];
  }

  dateClass = (date: Date) => {
    if (this.isDateAvailable(date)) {
      return 'available-date';
    }
    return 'unavailable-date';
  }
}
