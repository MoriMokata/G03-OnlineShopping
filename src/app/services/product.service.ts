import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { productsModel } from '../product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any

  constructor() { }
  
 

}
