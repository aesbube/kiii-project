import { Component, EventEmitter, Output } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';

interface Options {
  value: string;
  name: string;
}

@Component({
  selector: 'app-side-menu',
  imports: [
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  lastClicked = "Basic Info"
  @Output() currentTab = new EventEmitter<string>()

  setActiveButton(event: any) {
    const buttonText = (event.target as HTMLButtonElement).innerText.trim();
    switch(buttonText) {
      case "Basic Info":
        this.lastClicked = "Basic Info";
        break;
      case "Appointments":
        this.lastClicked = "Appointments";
        break;
      case "Prescriptions":
        this.lastClicked = "Prescriptions";
        break;
      case "History":
        this.lastClicked = "History";
        break;
    }
    this.currentTab.emit(this.lastClicked)
    console.log(this.lastClicked)
  }

}
