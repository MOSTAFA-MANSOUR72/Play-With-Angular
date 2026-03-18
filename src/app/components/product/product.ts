
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Product as products } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../productcard/productcard';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductCard,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit, AfterViewInit, OnDestroy {
  products: products[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    console.log('Product component initialized — products loaded:', this.products.length);
  }

  ngAfterViewInit(): void {
    console.log('Product ngAfterViewInit — all product cards are now in the DOM');
  }

  ngOnDestroy(): void {
    console.log('Product component destroyed');
  }
}
