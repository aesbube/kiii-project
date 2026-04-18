import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode',
  imports: [],
  template: `<svg #barcodeSvg></svg>`,
  styles: [`
    :host { display: inline-block; }
    svg { max-width: 100%; height: auto; display: block; }
  `]
})
export class BarcodeComponent implements AfterViewInit, OnChanges {
  @Input() value: string = '';
  @Input() format: string = 'CODE128';
  @ViewChild('barcodeSvg', {static: false}) barcodeSvg!: ElementRef<SVGSVGElement>;

  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.render();
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.viewReady) this.render();
  }

  private render(): void {
    if (!this.barcodeSvg || !this.value) return;
    try {
      JsBarcode(this.barcodeSvg.nativeElement, this.value, {
        format: this.format,
        displayValue: true,
        width: 2,
        height: 80,
        margin: 10,
        fontSize: 14,
      });
    } catch (err) {
      console.error('Error generating barcode:', err);
    }
  }
}
