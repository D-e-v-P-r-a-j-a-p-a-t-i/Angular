import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; // Import FormBuilder and Validators
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent {
  @Output() onSubmit = new EventEmitter<any>();
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location) {
    this.checkoutForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      payment: ['Cash On Delivery', Validators.required],
    });
  }

  handleSubmit(): void {
    if (this.checkoutForm.valid) {
      const orderData = this.checkoutForm.value;
      console.log(orderData);
      this.onSubmit.emit(orderData);
    } 
  }

  handleCancel(): void {
    this.location.back();
  }
}
