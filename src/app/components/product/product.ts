import { Component, OnInit } from '@angular/core';
import { Product as IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../productcard/productcard';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductCard,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products: IProduct[] = [];
  isLoading = true;
  errorMessage = '';
  skeletonItems = Array(6).fill(0); // 6 placeholder cards while loading

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Make sure the server is running.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onEdit(product: IProduct): void {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => {
        alert('Failed to delete product.');
        console.error(err);
      },
    });
  }
}
