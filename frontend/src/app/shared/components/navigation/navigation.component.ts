import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {

  authService = inject(AuthService);
  private hostRef = inject(ElementRef<HTMLElement>);

  menuOpen = false;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.menuOpen) return;
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuOpen = false;
  }

  get username(): string {
    return this.authService.getUsername();
  }

  get userInitial(): string {
    const name = this.username;
    return (name || '?').charAt(0).toUpperCase();
  }

  get roleLabel(): string {
    const raw = (this.authService.getRole() || '').replace(/^ROLE_/, '').toLowerCase();
    if (!raw) return '';
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  logout() {
    this.menuOpen = false;
    this.authService.logout();
  }
}
