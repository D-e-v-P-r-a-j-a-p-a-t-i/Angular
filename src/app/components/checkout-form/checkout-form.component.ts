import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  @Output() onSubmit = new EventEmitter<any>();

  name: string = '';
  address: string = '';
  payment: string = 'COD';

  handleSubmit(): void {
    const orderData = {
      name: this.name,
      address: this.address,
      paymentMethod: this.payment,
    };
    console.log(orderData);
    this.onSubmit.emit(orderData);
  }
}
