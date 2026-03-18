import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './edit-product.html',
    styleUrl: './edit-product.css',
})
export class EditProduct implements OnInit {
    productForm: FormGroup;
    productId = '';
    selectedFile: File | null = null;
    imagePreview: string | null = null;
    currentImage: string | null = null;
    isSubmitting = false;
    isFetching = true;   // shows inline spinner while patching values
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            price: ['', [Validators.required, Validators.min(0)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('id') ?? '';
        this.productService.getProduct(this.productId).subscribe({
            next: (product) => {
                this.productForm.patchValue({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                });
                this.currentImage = product.image;
                this.isFetching = false;
            },
            error: (err: unknown) => {
                this.errorMessage = 'Product not found or server is unreachable.';
                this.isFetching = false;
                console.error(err);
            },
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
        this.productService.updateProduct(this.productId, formData).subscribe({
            next: () => this.router.navigate(['/products']),
            error: (err) => {
                this.errorMessage = 'Failed to update product. Please try again.';
                this.isSubmitting = false;
                console.error(err);
            },
        });
    }

    getImageUrl(filename: string | null): string {
        return filename ? `http://localhost:3000/public/${filename}` : '';
    }

    get name() { return this.productForm.get('name'); }
    get price() { return this.productForm.get('price'); }
    get description() { return this.productForm.get('description'); }
}
