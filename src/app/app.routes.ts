import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Slider } from './components/slider/slider';
import { Contact } from './components/contact/contact';
export const routes: Routes = [
  {path: '', component: Slider},
  {path: 'home', component: Slider},
  {path: 'products', component: Product},
  {path: 'contact', component: Contact},

];
