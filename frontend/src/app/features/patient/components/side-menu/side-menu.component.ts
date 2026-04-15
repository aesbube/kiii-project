import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MenuItem {
  label: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  lastClicked = 'Basic Info';
  @Output() currentTab = new EventEmitter<string>();

  items: MenuItem[];

  constructor(sanitizer: DomSanitizer) {
    const svg = (d: string) =>
      sanitizer.bypassSecurityTrustHtml(
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
      );
    this.items = [
      { label: 'Basic Info', icon: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0 1 14 0v1"/>') },
      {
        label: 'Appointments',
        icon: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>')
      },
      {
        label: 'Prescriptions',
        icon: svg('<path d="M6 3h9a4 4 0 0 1 0 8H6z"/><path d="M10 11l7 10"/><line x1="14" y1="16" x2="19" y2="16"/>')
      },
      {
        label: 'History',
        icon: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/><polyline points="12 7 12 12 15 14"/>')
      },
    ];
  }

  select(label: string) {
    this.lastClicked = label;
    this.currentTab.emit(label);
  }
}
