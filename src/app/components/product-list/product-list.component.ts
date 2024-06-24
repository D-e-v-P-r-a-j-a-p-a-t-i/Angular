import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interface/Product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.map((product: Product) => ({ ...product, quantity: 1 })); // Initialize quantity to 1
      this.loading = false;
    }, error => {
      console.error('Error fetching products', error);
      this.loading = false;
    });
  }

  incrementQuantity(product: Product) {
    if (product.quantity < 10) {
      product.quantity++;
    }
  }

  decrementQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  viewProduct(productId: string) {
    this.router.navigate([`/products/${productId}`]);
  }

  addToCart(product: Product) {
    // Implement add to cart functionality
    console.log('Adding to cart', product);
  }
}
