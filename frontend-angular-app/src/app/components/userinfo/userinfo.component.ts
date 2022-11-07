import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userData: any;
  previewLoaded: boolean = false;
  defaultPics: string = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  date: Array<number> = new Array(30);
  year: Array<number> = new Array(50);
  i: number = 0
  rangeDate(end: number, value: number) {
    for (this.i = 0; this.i <= end; this.i++) {
      this.date[this.i] = value;
      value++;
    }
    return this.date;
  }
  rangeYear(end: number, value: number) {
    for (this.i = 0; this.i <= end; this.i++) {
      this.year[this.i] = value;
      value++;
    }
    return this.year;
  }

  country: Array<string> = ["Mueang Nakhon Ratchasima District", "Ban Lueam District", "Bua Lai District", "Bua Yai District", "	Chakkarat District", "Chaloem Phra Kiat District", "Chok Chai District", "Chum Phuang District", "Dan Khun Thot District", "Huai Thalaeng District"]

  region: Array<string> = ["Kamphaeng Phet", "Chiang Rai", "Chiang Mai", "Tak", "Nakhon Sawan", "Nan", "Phichit", "Phitsanulok", "Phetchabun", "Mae Hong Son"]

  month: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  gender: Array<string> = ["Male", "Female", "Other"]

  occupation: Array<string> = ["Student", "Professor", "Merchant", "Researcher", "Businessman", "Doctor", "Police", "Post man", "Engineer", "Other"]

  userinfoForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),

    address: new FormGroup({
      address: new FormControl(),
      country: new FormControl(),
      region: new FormControl(),
      zipcode: new FormControl(),
      mobile: new FormControl(),
    }),
    gender: new FormControl(),
    occupation: new FormControl(),
    birthdate: new FormControl(1),
    birthmonth: new FormControl(this.month[0]),
    birthyear: new FormControl(1972),
    file: new FormControl(),
    picture: new FormControl(),
  })

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    let id = localStorage.getItem("id");
    if (id) {
      this.getUserData(id);
    }
  }

  getUserData(id: string) {
    this.userService.getUserData(id).subscribe({
      next: data => {
        if (data._id) {
          this.userData = data;
          this.userinfoForm.patchValue({
            name: data?.firstName ?? null,
            surname: data?.lastName ?? null,
            address: {
              address: data.address?.address ?? null,
              country: data.address?.country ?? null,
              region: data.address?.region ?? null,
              zipcode: data.address?.zipcode ?? null,
              mobile: data.address?.mobile ?? null,
            },
            gender: data?.gender ?? null,
            birthdate: new Date(data.birthDay ?? `1972-01-01`).getDate(),
            birthmonth: this.month[new Date(data.birthDay ?? `1972-01-01`).getMonth()],
            birthyear: new Date(data.birthDay ?? `1972-01-01`).getFullYear(),
            occupation: data?.occupation ?? null,
            picture: data?.picture ?? null,
          })
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        this.userinfoForm.reset();
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.userinfoForm.patchValue({
            picture: reader.result?.toString()
          });
        };
      }
    }
  }

  submit() {
    let payload = {
      firstName: this.userinfoForm.value.name ?? "",
      lastName: this.userinfoForm.value.surname ?? "",
      address: this.userinfoForm.value.address ?? {},
      gender: this.userinfoForm.value.gender ?? "",
      occupation: this.userinfoForm.value.occupation ?? "",
      birthDay: new Date(`${this.userinfoForm.value.birthyear} ${this.userinfoForm.value.birthmonth} ${this.userinfoForm.value.birthdate}`),
      picture: this.userinfoForm.value.picture ?? "",
    }

    let id = localStorage.getItem("id");
    if (!id) {
      alert("user id not found")
      return;
    }

    this.userService.updateUser(id, payload).subscribe({
      next: data => {
        console.log(data);
        if (data._id) {
          alert('User profile saved');
          window.location.reload();
        }
      },
      error: err => {
        console.log(err);
        alert('User profile saving failed!');
      }
    })
    
  }

}
