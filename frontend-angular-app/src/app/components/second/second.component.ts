import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  productForm = new FormGroup({
    type: new FormControl('',Validators.required),
    id: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    detail: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
  
  });

  productType: string[] = ['Electronics','Wears','Furnitures','Food'];

  constructor(private productService :ProductService) { }

  ngOnInit(): void {
  }

  addProduct(){
    this.productService.products.push(this.productForm.value as any)
  }

}
