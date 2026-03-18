import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private products: Product[] = [
        {
            id: 1,
            name: 'Smart Watch Pro',
            price: 120,
            description:
                'This watch is very beautiful and smart. It tracks your fitness, monitors your heart rate, and connects to your phone seamlessly.',
            image: 'watch1.jpg',
            category: 'Electronics',
            quantity: 10,
        },
        {
            id: 2,
            name: 'Classic Timepiece',
            price: 90,
            description:
                'A timeless classic watch with a leather strap and a clean dial. Perfect for formal occasions and everyday wear.',
            image: 'watch2.jpg',
            category: 'Accessories',
            quantity: 0,
        },
        {
            id: 3,
            name: 'Sport Runner',
            price: 150,
            description:
                'Designed for athletes, this sport watch is waterproof and durable. It has GPS tracking and a long battery life.',
            image: 'watch3.jpg',
            category: 'Sports',
            quantity: 5,
        },
        {
            id: 4,
            name: 'Luxury Edition',
            price: 300,
            description:
                'An exclusive luxury watch crafted with premium materials. It is the perfect statement piece for any sophisticated wardrobe.',
            image: 'watch2f.jpg',
            category: 'Luxury',
            quantity: 3,
        },
    ];

    getProducts(): Product[] {
        return this.products;
    }
}
