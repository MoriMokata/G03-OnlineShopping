import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAddressService } from 'src/app/services/user-address.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  @Input() user: any | undefined;
  
  userAddresses: any;
  @Output() userAddressEvent = new EventEmitter<any>();
  selectedAddress: any | undefined;

  constructor(
    private userAddressService: UserAddressService
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('id');
    if (userId) {
      this.getUserAddresses(userId);
    }
  }

  getUserAddresses(userId: string) {
    this.userAddressService.getUserAddresses(userId).subscribe({
      next: data => {
        this.userAddresses = data;
        this.selectedAddress = data[0];
        this.userAddressEvent.emit(this.selectedAddress);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleChange(index: number) {
    this.selectedAddress = this.userAddresses[index];
    this.userAddressEvent.emit(this.selectedAddress);
  }

}
