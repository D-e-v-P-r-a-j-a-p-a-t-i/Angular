import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  @Input() orderData: any;
  @Output() handleClose = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  handleOkClick(): void {
    this.handleClose.emit();
  }
}
