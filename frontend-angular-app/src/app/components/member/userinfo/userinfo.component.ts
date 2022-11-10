import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userData: any;
  previewLoaded: boolean = false;
  defaultPics: string = 'https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg';

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
    name: new FormControl('',Validators.required),
    surname: new FormControl('', Validators.required),

    address: new FormGroup({
      address: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      zipcode: new FormControl('',[Validators.required,Validators.pattern('^[1-9][0-9]{4}')]),
      mobile: new FormControl('', [Validators.required,Validators.pattern('(0)[0-9]{9}')]),
    }),
    gender: new FormControl('', Validators.required),
    occupation: new FormControl('', Validators.required),
    birthdate: new FormControl(1, Validators.required),
    birthmonth: new FormControl(this.month[0] ,Validators.required),
    birthyear: new FormControl(1972, Validators.required),
    file: new FormControl('',Validators.required),
    picture: new FormControl(this.defaultPics,Validators.required),
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
            name: data?.userInfo?.firstName ?? '',
            surname: data?.userInfo?.lastName ?? '',
            address: {
              address: data.userInfo?.address?.address ?? '',
              country: data.userInfo?.address?.country ?? '',
              region: data.userInfo?.address?.region ?? '',
              zipcode: data.userInfo?.address?.zipcode ?? '',
              mobile: data.userInfo?.address?.mobile ?? '',
            },
            gender: data?.userInfo?.gender ?? '',
            birthdate: new Date(data.birthDay ?? `1972-01-01`).getDate(),
            birthmonth: this.month[new Date(data.birthDay ?? `1972-01-01`).getMonth()],
            birthyear: new Date(data.birthDay ?? `1972-01-01`).getFullYear(),
            occupation: data?.userInfo?.occupation ?? '',
            picture: data?.userInfo?.picture ?? this.defaultPics,
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
      address: { ...this.userinfoForm.value.address, fromUserInfo: true } ?? {},
      gender: this.userinfoForm.value.gender ?? "",
      occupation: this.userinfoForm.value.occupation ?? "",
      birthDay: new Date(`${this.userinfoForm.value.birthyear} ${this.userinfoForm.value.birthmonth} ${this.userinfoForm.value.birthdate}`),
      picture: this.userinfoForm.value.picture ?? this.defaultPics,
      fromUserInfo: true,
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
