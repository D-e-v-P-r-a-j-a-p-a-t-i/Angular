import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interface/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  quantities: { [key: string]: number } = {};
  loading = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.products.forEach((product) => (this.quantities[product._id] = 1));
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products', error);
        this.loading = false;
      }
    );
  }

  incrementQuantity(productId: string) {
    if (this.quantities[productId] < 10) {
      this.quantities[productId]++;
    }
  }

  decrementQuantity(productId: string) {
    if (this.quantities[productId] > 1) {
      this.quantities[productId]--;
    }
  }

  viewProduct(productId: string) {
    this.router.navigate([`/products/${productId}`]);
  }

  addToCart(productId: string) {
    const quantity = this.quantities[productId];
    if (productId) {
      this.cartService.addToCart(productId, quantity).subscribe(
        (response) => {
          console.log('Product added to cart:', response);
          this.router.navigateByUrl('/cart');
        },
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    }
  }
}
