import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: Product) => {
          console.log(data);
          this.product = data;
        },
        (error) => {
          console.error('Error fetching product', error);
        }
      );
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product._id, 1).subscribe(
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
