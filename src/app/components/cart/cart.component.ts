// cart.component.ts

import { Component, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interface/Cart'; // Ensure the correct path to CartItem interface
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Example initialization, you may want to fetch actual data from the server here
    this.loadCart('user-id-123'); // Replace with actual user ID or fetch dynamically
  }

  loadCart(userId: string): void {
    this.cartService.getCart(userId).subscribe(
      (response) => {
        this.cartItems = response.items; // Adjust based on your API response structure
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  removeItem(index: number): void {
    const itemId = this.cartItems[index].id; // Assuming you have an 'id' property on CartItem
    this.cartService.deleteCartItem('user-id-123', itemId+'').subscribe(
      () => {
        this.cartItems.splice(index, 1);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  updateQuantity(index: number, quantity: number): void {
    const item = this.cartItems[index];
    if (quantity > 0) {
      item.quantity = quantity;
      this.cartService.addToCart(item).subscribe(
        () => {
          // Cart updated successfully
        },
        (error) => {
          console.error('Error updating quantity:', error);
        }
      );
    } else {
      this.removeItem(index);
    }
  }
}
