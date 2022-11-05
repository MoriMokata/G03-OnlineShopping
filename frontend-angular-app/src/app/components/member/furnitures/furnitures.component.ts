import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-furnitures',
  templateUrl: './furnitures.component.html',
  styleUrls: ['./furnitures.component.css']
})
export class FurnituresComponent implements OnInit {

  products: any = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductsByType("Furniture").subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
