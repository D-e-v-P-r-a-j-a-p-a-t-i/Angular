import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interface/Cart';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  private cartId: string = '';

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      (response) => {
        if (response && response.products) {
          this.cartId = response._id;
          this.cartItems = response.products;
        }
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  getTotal(): number {
    return this.cartService.getTotal(this.cartItems);
  }

  removeItem(itemId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.cartService.deleteCartItem(this.cartId, itemId).subscribe(
          () => {
            this.loadCart();
          },
          (error) => {
            console.error('Error deleting item:', error);
          }
        );
      } else {
        console.log('Deletion canceled or result was not true.');
      }
    });
  }

  updateQuantity(index: number, quantity: number): void {
    const item = this.cartItems[index];
    if (quantity > 0) {
      item.quantity = quantity;
      // Uncomment and implement addToCart in CartService if needed
      // this.cartService.addToCart(item.productId, quantity).subscribe(
      //   () => {
      //     // Cart updated successfully
      //   },
      //   (error) => {
      //     console.error('Error updating quantity:', error);
      //   }
      // );
    } else {
      this.removeItem(item._id);
    }
  }

  checkout(): void {
    this.router.navigateByUrl('/checkout');
  }
}
