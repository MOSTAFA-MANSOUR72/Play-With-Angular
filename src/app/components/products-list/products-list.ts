import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  filter: string = 'all';

  products: any[] = [
    { id: 1, name: 'Smart Watch', price: 120, image: 'watch1.jpg', inStock: true, category: 'accessories' },
    { id: 2, name: 'Classic Watch', price: 90, image: 'watch2.jpg', inStock: false, category: 'accessories' },
    { id: 3, name: 'Sport Watch', price: 150, image: 'watch3.jpg', inStock: true, category: 'accessories' },
    { id: 4, name: 'Mac laptop', price: 850, image: 'lap1.jpg', inStock: true, category: 'electrics' },
    { id: 5, name: 'Dell laptop', price: 750, image: 'lap2.jpg', inStock: false, category: 'electrics' },
    { id: 6, name: 'Huawei laptop', price: 650, image: 'lap3.jpg', inStock: true, category: 'electrics' },
    { id: 7, name: 'Running Shoes', price: 85, image: 'image.png', inStock: true, category: 'shoes' },
    { id: 8, name: 'Leather Sneakers', price: 120, image: 'shoes.jpg', inStock: true, category: 'shoes' },
  ];

  setFilter(cat: string) {
    this.filter = cat;
  }

  get filteredProducts() {
    if (this.filter === 'all') return this.products;
    return this.products.filter((p) => p.category === this.filter);
  }
}
