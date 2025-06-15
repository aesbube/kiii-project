import { CommonModule, NgSwitch } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentSearchComponent } from '../appointment-search/appointment-search.component';
import { MapSearchComponent } from "../map-search/map-search.component";
import { SpecialistSearchComponent } from '../specialist-search/specialist-search.component';


@Component({
  selector: 'app-home-card',
  imports: [
    CommonModule,
    MatCardModule,
    AppointmentSearchComponent,
    MapSearchComponent,
    SpecialistSearchComponent,
    NgSwitch
],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css',
  host: {
    '[style.--card-background-image]': 'getBackgroundImageUrl()',
    '[style.--custom-flex]': 'getFlexSize()',
  },
})
export class HomeCardComponent implements OnInit{
  @Input() uniqueAction = ''
  imageUrl = '';
  isHovered = false;
  isFocused = false;
  @Output() customFlex = new EventEmitter<number>();


  ngOnInit(): void {
    if (this.uniqueAction == "app") {
      this.imageUrl = "/appointment.jpg"
    }
    if (this.uniqueAction == "spec") {
      this.imageUrl = "/specialist.jpg"
    }
  }

  getBackgroundImageUrl(): string {
    return `url(${this.imageUrl})`;
  }

  getFlexSize(): number{
    if (this.isFocused)
      return 2
    return 1
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
  }

  setFocused(focused: boolean): void {
    this.isFocused = focused;
    if (!focused)
      this.customFlex.emit(0)
    else{
      if (this.uniqueAction == "app")
        this.customFlex.emit(1)
      else
        this.customFlex.emit(2)
    }
  }

  @HostBinding('class.no-grayscale')
  get noGrayscale(): boolean {
    return this.isHovered || this.isFocused;
  }

}
