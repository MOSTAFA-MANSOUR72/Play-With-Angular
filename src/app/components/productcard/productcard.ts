import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ShortenPipe } from '../../pipes/shorten.pipe';
import { Card } from '../card/card';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        Card,        
        ShortenPipe, 
    ],
    templateUrl: './productcard.html',
    styleUrl: './productcard.css',
})
export class ProductCard implements OnInit, AfterViewInit, OnDestroy {
    @Input() product!: Product;

    ngOnInit(): void {
        console.log(`ngOnInit — ProductCard initialized for: ${this.product.name}`);
        console.log('   Product data received:', this.product);
    }

    ngAfterViewInit(): void {
        console.log(`ngAfterViewInit — View is loaded for: ${this.product.name}`);
    }

    ngOnDestroy(): void {
        console.log(`ProductCard destroyed — ${this.product.name}`);
    }
}
