import { Component, OnInit } from '@angular/core';
import { UserAddressService } from 'src/app/services/user-address.service';
import { FormControl,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userAddresses: any;

  country: Array<string> = ["Mueang Nakhon Ratchasima District", "Ban Lueam District", "Bua Lai District", "Bua Yai District", "	Chakkarat District", "Chaloem Phra Kiat District", "Chok Chai District", "Chum Phuang District", "Dan Khun Thot District", "Huai Thalaeng District"]

  region: Array<string> = ["Kamphaeng Phet", "Chiang Rai", "Chiang Mai", "Tak", "Nakhon Sawan", "Nan", "Phichit", "Phitsanulok", "Phetchabun", "Mae Hong Son"]

  address = new FormGroup({
    address: new FormControl(),
    country: new FormControl(),
    region: new FormControl(),
    zipcode: new FormControl(),
    mobile: new FormControl(),
  })

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
        
      },
      error: err => {
        console.log(err);
      }
    })
  }

  submit() {
  
    let id = localStorage.getItem("id");
    if (!id) {
      alert("user id not found")
      return;
    }

    let payload = {
      userId : id ,
      address: this.address.value.address ?? "",
      country: this.address.value.country ?? "",
      region: this.address.value.region ?? "",
      zipcode: this.address.value.zipcode ?? "",
      mobile: this.address.value.mobile ?? "",
      fromUserInfo: false,
    }

    this.userAddressService.addAddress(payload).subscribe({
      next: data => {
        if (data._id) {
          alert('Product added successfully');
          this.address.reset();
          this.getUserAddresses(data.userId);
        } else {
          alert('Product added failed');
        }
      },
      error: err => {
        console.log(err);
        alert('Product added failed');
      }
    });

    
  }

  deleteAddress(addressId: string){
    if(confirm('Are you sure ?')==false) {
      return;
    }

    this.userAddressService.deleteAddress(addressId).subscribe({
      next: data => {
        if (data.deletedCount > 0){
          alert('product deleted');
          this.getUserAddresses(localStorage.getItem('id') as string);
        }else{
          alert('failed to delete');
        }
      },
      error: err => {
        alert('failed to delete');
      }
    });
  }


  
  

}
