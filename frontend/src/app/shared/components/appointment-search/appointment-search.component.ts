import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-search',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment-search.component.html',
  styleUrl: './appointment-search.component.css'
})
export class AppointmentSearchComponent implements AfterViewInit {

  searchControl2 = new FormControl('');

  @HostBinding('class.no-grayscale') isInputFocused: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.addEventListener('focus', () => {
      this.isInputFocused = true;
    });

    this.searchInput.nativeElement.addEventListener('blur', () => {
      this.isInputFocused = false;
    });
  }

  goToAppointment() {
    if (!this.searchControl2.value) return;
    this.router.navigate(['/appointment', this.searchControl2.value]);
  }

  @Output() focused = new EventEmitter<boolean>();

  onFocus(): void {
    this.focused.emit(true);
  }

  onBlur(): void {
    this.focused.emit(false);
  }
}
