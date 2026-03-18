import { Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Slider } from './components/slider/slider';
import { Contact } from './components/contact/contact';
import { AddProduct } from './components/add-product/add-product';
import { EditProduct } from './components/edit-product/edit-product';

export const routes: Routes = [
  { path: '', component: Slider },
  { path: 'home', component: Slider },
  { path: 'products', component: Product },
  { path: 'contact', component: Contact },
  { path: 'add-product', component: AddProduct },
  { path: 'edit-product/:id', component: EditProduct },
];
