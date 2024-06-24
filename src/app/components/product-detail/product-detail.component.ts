import { Component, Input, NgModule } from '@angular/core';
import { Product } from '../../interface/Product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() product: Product = {} as Product;

  constructor() { }
}
