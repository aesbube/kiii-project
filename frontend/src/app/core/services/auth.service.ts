import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();
  public jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.checkAuthStatus();
  }

  login(credentials: { username: string; email: string }): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }),
        map(() => true),
        catchError(error => {
          console.error('Login failed:', error);
          this.isAuthenticatedSubject.next(false);
          return throwError(() => error);
        })
      );
  }

  register(registrationData: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, registrationData);
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  checkAuthStatus(): void {
    if (this.getToken()) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log("Decoded Token", decodedToken)
        return decodedToken?.role || "ROLE_GUEST";
      } catch (error) {
        console.error('Error decoding token:', error);
        return "ROLE_GUEST";
      }
    }
    return "ROLE_GUEST";
  }

  getUserId(): number {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log("Decoded Token", decodedToken)
        return decodedToken?.id
      } catch (error) {
        console.error('Error decoding token:', error);
        return 0
      }
    }
    return 0
  }

}
