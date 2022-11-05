import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wears',
  templateUrl: './wears.component.html',
  styleUrls: ['./wears.component.css']
})
export class WearsComponent implements OnInit {

  products: any = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductsByType("Wears").subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  
}
