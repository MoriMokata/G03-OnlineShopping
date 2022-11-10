import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  @Input() cartTotalPrice: number = 0;
  @Input() shippingPrice: number = 0;
  @Output() paymentInfoEvent = new EventEmitter<any>();
  @Output() paymentSubmitEvent = new EventEmitter<void>();

  types = [
    {
      value: 'CREDIT_CARD',
      img: 'https://i.imgur.com/WIAP9Ku.jpg',
    },
    {
      value: 'DEBIT_CARD',
      img: 'https://i.imgur.com/OdxcctP.jpg',
    },
    {
      value: 'PAYPAL',
      img: 'https://i.imgur.com/cMk1MtK.jpg',
    }
  ]

  paymentInfoForm = new FormGroup({
    type: new FormControl(''),
    cname: new FormControl(''),
    cnum: new FormControl(''),
    exp: new FormControl(''),
    cvv: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
    this.paymentInfoEvent.emit(this.paymentInfoForm.value)
    this.paymentInfoForm.valueChanges.subscribe(value => {
      if (value) {
        this.paymentInfoEvent.emit(value);
      }
    })
  }

  submit() {
    this.paymentSubmitEvent.emit();
  }

}
