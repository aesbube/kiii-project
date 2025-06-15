import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {DoctorDetailsComponent} from '../../../features/doctor/components/doctor-details/doctor-details.component';
import {
  SpecialistDetailsComponent
} from '../../../features/specialist/components/specialist-details/specialist-details.component';
import {Role} from '../../../models/roles.model';

@Component({
  selector: 'app-info-container',
  imports: [
    DoctorDetailsComponent,
    SpecialistDetailsComponent
  ],
  templateUrl: './info-container.component.html',
  styleUrl: './info-container.component.css'
})
export class InfoContainerComponent implements OnInit {

  authService = inject(AuthService)
  userRole: String = "ROLE_GUEST"

  constructor(private router: Router){}

  ngOnInit(){
    this.userRole = this.authService.getRole()
    if (this.userRole == "ROLE_GUEST")
      this.router.navigate(['/login']);
  }

  protected readonly Roles = Role;

}
