import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {

  shippingOption: Array<{ name: string, price: number }> = [
    { name: "Shopee Xpress (Standard Delivery)", price: 20 },
    { name: "J&T Express", price: 25 },
    { name: "Flash Express", price: 15 },
    { name: "Worklink Services Inc", price: 50 },
  ];

  selectedShippingOption: any = [];
  // comment: string = "";
  comment = new FormControl('');

  @Output() shippingEvent = new EventEmitter<any>();
  @Output() commentEvent = new EventEmitter<string>();

  @Input() cart: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.selectedShippingOption = this.shippingOption[0];
    this.shippingEvent.emit(this.selectedShippingOption);

    this.comment.valueChanges.subscribe(value => {
      if (value) {
        this.commentEvent.emit(value);
      }
    })
  }

  handleSelectChange(event: any) {
    this.selectedShippingOption = this.shippingOption[event.target.value as number];
    this.shippingEvent.emit(this.selectedShippingOption);
  }

}
