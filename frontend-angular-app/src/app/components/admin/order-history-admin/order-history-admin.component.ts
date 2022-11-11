import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history-admin',
  templateUrl: './order-history-admin.component.html',
  styleUrls: ['./order-history-admin.component.css']
})
export class OrderHistoryAdminComponent implements OnInit {
  
  orders: any=[];
  constructor(private os: OrderService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading() {
    this.os.getOrderAll().subscribe({
      next: data => {
        this.orders = data;
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
