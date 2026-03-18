import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './add-product.html',
    styleUrl: './add-product.css',
})
export class AddProduct {
    productForm: FormGroup;
    selectedFile: File | null = null;
    imagePreview: string | null = null;
    isSubmitting = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            price: ['', [Validators.required, Validators.min(0)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            const reader = new FileReader();
            reader.onload = () => (this.imagePreview = reader.result as string);
            reader.readAsDataURL(this.selectedFile);
        }
    }

    onSubmit(): void {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }

        const formData = new FormData();
        formData.append('name', this.productForm.value.name);
        formData.append('price', this.productForm.value.price);
        formData.append('description', this.productForm.value.description);
        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }

        this.isSubmitting = true;
        this.productService.addProduct(formData).subscribe({
            next: () => this.router.navigate(['/products']),
            error: (err) => {
                this.errorMessage = 'Failed to add product. Please try again.';
                this.isSubmitting = false;
                console.error(err);
            },
        });
    }

    get name() { return this.productForm.get('name'); }
    get price() { return this.productForm.get('price'); }
    get description() { return this.productForm.get('description'); }
}
