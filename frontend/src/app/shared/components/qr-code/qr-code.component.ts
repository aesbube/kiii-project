import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code',
  imports: [
    FormsModule,
    CommonModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {

  @Input() qrText: string = 'Hello, QR Code!';
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef;

  ngAfterViewInit(): void {
    this.generateQrCode();
  }

  onInputChange(event: Event): void {
    this.qrText = (event.target as HTMLInputElement).value;
    this.generateQrCode();
  }

  generateQrCode(): void {
    QRCode.toCanvas(this.qrCanvas.nativeElement, this.qrText, {
      errorCorrectionLevel: 'H'
    }, (error: any) => {
      if (error) {
        console.error('Error generating QR code', error);
      } else {
        console.log('QR code generated successfully!');
      }
    });
  }

}
