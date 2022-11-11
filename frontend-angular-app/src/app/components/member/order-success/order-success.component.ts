import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  user: any | undefined;
  order: any;
  cart: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    let orderId = this.activateRoute.snapshot.paramMap.get('orderId');
    if (orderId) {
      console.log(orderId);
      console.log("มี easter egg ซ่อนอยู่นะ อิอิ");
      this.getOrderDetail(orderId);
    }
  }

  getOrderDetail(orderId: string) {
    this.orderService.getOrderDetail(orderId).subscribe({
      next: data => {
        this.order = data;
        console.log(data);
        
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
