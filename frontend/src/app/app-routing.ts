import {Routes} from '@angular/router';
import {Home2Component} from './shared/components/home2/home2.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {AuthRedirectGuard} from './core/guards/auth-redirect.guard';
import {RoleGuard} from './core/guards/role.guard';
import {DashboardContainerComponent} from './shared/components/dashboard-container/dashboard-container.component';
import {AppointmentComponent} from './features/doctor/components/appointment/appointment.component';
import {SpecialistComponent} from './shared/components/specialist/specialist.component';
import {
  SpecialistDetailsComponent
} from './features/specialist/components/specialist-details/specialist-details.component';
import {
  AppointmentOccupiedComponent
} from './features/specialist/components/appointment-occupied/appointment-occupied.component';
import {AppointmentFreeComponent} from './features/specialist/components/appointment-free/appointment-free.component';
import {DoctorPatientsComponent} from './features/doctor/components/doctor-patients/doctor-patients.component';
import {ClaimPatientComponent} from './features/doctor/components/claim-patient/claim-patient.component';
import {DoctorDetailsComponent} from './features/doctor/components/doctor-details/doctor-details.component';
import {UsersAdminComponent} from './features/admin/components/users-admin/users-admin.component';
import {RegisterAdminComponent} from './features/admin/components/register-admin/register-admin.component';
import {PatientPanelComponent} from './features/doctor/components/patient-panel/patient-panel.component';
import {WritePrescriptionComponent} from './features/doctor/components/write-prescription/write-prescription.component';
import {PharmacistScanComponent} from './features/pharmacist/components/pharmacist-scan/pharmacist-scan.component';
import {
  AppointmentDiagnosisComponent
} from './features/specialist/components/appointment-diagnosis/appointment-diagnosis.component';
import {
  AppointmentDetailsComponent
} from './features/doctor/components/appointment-details/appointment-details.component';
import {AppointmentRefComponent} from './shared/components/appointment-ref/appointment-ref.component';

export const routes: Routes = [
  {path: '', component: Home2Component},
  {path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'appointment/:reference', component: AppointmentRefComponent},
  {path: 'specialist/:username', component: SpecialistComponent},
  {path: 'scan', component: PharmacistScanComponent},
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    canActivate: [RoleGuard],
    data: {"expectedRole": ["ROLE_PATIENT", "ROLE_DOCTOR", "ROLE_SPECIALIST", "ROLE_PHARMACIST", "ROLE_ADMIN"]}
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    data: {"expectedRole": ["ROLE_SPECIALIST"]},
    children: [
      {path: 'info', component: SpecialistDetailsComponent},
      {path: 'appointments', component: AppointmentOccupiedComponent},
      {path: 'appointments/:id', component: AppointmentDiagnosisComponent},
      {path: 'free-appointments', component: AppointmentFreeComponent}
    ]
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    data: {"expectedRole": ["ROLE_DOCTOR"]},
    children: [
      {path: 'info-d', component: DoctorDetailsComponent},
      {path: 'patients', component: DoctorPatientsComponent},
      {path: 'patients/:id', component: PatientPanelComponent},
      {path: 'patients/:id/prescription', component: WritePrescriptionComponent},
      {path: 'patients/:id/appointments', component: AppointmentComponent},
      {path: 'patients/:id/:appointmentId', component: AppointmentDetailsComponent},
      {path: 'claim-patient', component: ClaimPatientComponent}
    ]
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    data: {"expectedRole": ["ROLE_ADMIN"]},
    children: [
      {path: 'users', component: UsersAdminComponent},
      {path: 'register', component: RegisterAdminComponent},
    ]
  }
];
