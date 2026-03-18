import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const CACHE_KEY = 'products_cache';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/api/products';

    // In-memory cache — falls back to sessionStorage so reloads are instant too
    private get cache(): Product[] | null {
        const stored = sessionStorage.getItem(CACHE_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    private set cache(value: Product[] | null) {
        if (value === null) {
            sessionStorage.removeItem(CACHE_KEY);
        } else {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(value));
        }
    }

    constructor(private http: HttpClient) { }


    getProducts(): Observable<Product[]> {
        if (this.cache) {
            this.http.get<Product[]>(this.apiUrl).subscribe(data => {
                this.cache = data;
            });
            return of(this.cache);
        }
        // First visit: fetch and populate cache
        return this.http.get<Product[]>(this.apiUrl).pipe(
            tap(data => (this.cache = data))
        );
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    addProduct(formData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, formData).pipe(
            tap(newProduct => {
                // Add the new product into the cache so /products loads instantly
                if (this.cache) {
                    this.cache = [...this.cache, newProduct];
                }
            })
        );
    }

    updateProduct(id: string, formData: FormData): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, formData).pipe(
            tap(updated => {
                // Replace the updated product in the cache
                if (this.cache) {
                    this.cache = this.cache.map(p => p.id === id ? updated : p);
                }
            })
        );
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                // Remove the deleted product from the cache
                if (this.cache) {
                    this.cache = this.cache.filter(p => p.id !== id);
                }
            })
        );
    }
}
