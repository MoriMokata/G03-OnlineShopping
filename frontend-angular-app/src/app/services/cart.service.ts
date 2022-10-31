import { Injectable } from '@angular/core';
import { productsModel } from '../product.model'

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartProduct: productsModel = [];
  total: number = 0

  constructor() { }

}
