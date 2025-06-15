import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();
    const isLoggedIn = this.authService.isLoggedIn();


    console.log('Expected Role:', expectedRole);
    console.log('User Role:', userRole);
    console.log('Is Logged In:', isLoggedIn);


    if (!userRole) {
      console.log('No user role found, redirecting to /');
      this.router.navigate(['/']);
      return false;
    }

    if (typeof (expectedRole) == typeof ([])) {
      if (!expectedRole.includes(userRole)) {
        console.log('Incorrect user role, redirecting to /');
        this.router.navigate(['/']);
        return false;
      }
    }


    else {
      if (userRole !== expectedRole) {
        console.log('Incorrect user role, redirecting to /');
        this.router.navigate(['/']);
        return false;
      }
    }


    console.log('Role authorized');
    return true;
  }
}
