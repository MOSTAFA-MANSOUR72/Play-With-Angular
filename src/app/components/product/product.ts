import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  products: any[] = [
    { id: 1, name: 'Smart Watch', price: 120, image: 'watch1.jpg', inStock: true },
    { id: 2, name: 'Classic Watch', price: 90, image: 'watch2.jpg', inStock: false },
    { id: 3, name: 'Sport Watch', price: 150, image: 'watch3.jpg', inStock: true },
  ];
}
