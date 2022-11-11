import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('id');
    if (userId) {
      this.getOrderHistoryByMember(userId);
    }
  }

  getOrderHistoryByMember(userId: string) {
    this.orderService.getOrderByMember(userId).subscribe({
      next: data => {
        data.sort((a: any, b: any) => {
          if (a._id < b._id) {
            return 1;
          }
          if (a._id > b._id) {
            return -1;
          }
          return 0;
        });
        this.orders = data;
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
