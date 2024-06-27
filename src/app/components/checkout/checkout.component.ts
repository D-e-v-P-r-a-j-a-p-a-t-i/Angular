import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { OrderSummaryComponent } from '../order-summmary/order-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent, CheckoutFormComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderData: any = null;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void { }

  handleFormSubmit(data: any): void {
    this.cartService.placeOrder(data).subscribe(
      (result: any) => {
        console.log(result);
        this.orderData = result;
      },
      (error: any) => {
        console.error('Error placing order:', error);
      }
    );
  }

  handleOkClick(): void {
    if (this.orderData) {
      this.cartService.clearCart().subscribe(() => {
        console.log('Cart cleared after order placement.');
        this.orderData = null;
        this.router.navigate(['/']);
      });
    }
  }
}
