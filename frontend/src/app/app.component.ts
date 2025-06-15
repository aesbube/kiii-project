import { Component } from '@angular/core';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavigationComponent,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MedView-frontend';
}
