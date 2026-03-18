import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ShortenPipe } from '../../pipes/shorten.pipe';
import { Card } from '../card/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        Card,
        ShortenPipe,
        CommonModule,
    ],
    templateUrl: './productcard.html',
    styleUrl: './productcard.css',
})
export class ProductCard implements OnInit, AfterViewInit, OnDestroy {
    @Input() product!: Product;
    @Output() editClicked = new EventEmitter<Product>();
    @Output() deleteClicked = new EventEmitter<string>();

    getImageUrl(): string {
        if (!this.product.image) return 'https://placehold.co/400x300?text=No+Image';
        // If the image is already a full URL, use it as-is
        if (this.product.image.startsWith('http')) return this.product.image;
        return `http://localhost:3000/public/${this.product.image}`;
    }

    onEdit(): void {
        this.editClicked.emit(this.product);
    }

    onDelete(): void {
        this.deleteClicked.emit(this.product.id);
    }

    ngOnInit(): void {
        console.log(`ngOnInit — ProductCard initialized for: ${this.product.name}`);
    }

    ngAfterViewInit(): void {
        console.log(`ngAfterViewInit — View is loaded for: ${this.product.name}`);
    }

    ngOnDestroy(): void {
        console.log(`ProductCard destroyed — ${this.product.name}`);
    }
}
