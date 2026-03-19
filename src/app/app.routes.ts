import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Product } from './components/product/product';
import { ProductsList } from './components/products-list/products-list';
import { Slider } from './components/slider/slider';
import { Contact } from './components/contact/contact';
export const routes: Routes = [
  {path: '', component: Slider},
  {path: 'home', component: Slider},
  {path: 'products', component: ProductsList},
  {path: 'contact', component: Contact},

];
