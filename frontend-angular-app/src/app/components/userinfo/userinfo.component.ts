import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  previewLoaded: boolean = false;

  date : Array<number> = new Array(30);
  i:number = 0
  range(end : number ,value : number) {
    for (this.i = 0;this.i <= end; this.i++) {
      this.date[this.i]=value;
      value++;
    }
    return this.date;
  }

  country : Array<string> = ["Mueang Nakhon Ratchasima District","Ban Lueam District","Bua Lai District","Bua Yai District","	Chakkarat District","Chaloem Phra Kiat District","Chok Chai District","Chum Phuang District","Dan Khun Thot District","Huai Thalaeng District"]

  region : Array<string> = ["Kamphaeng Phet","Chiang Rai","Chiang Mai","Tak","Nakhon Sawan","Nan","Phichit","Phitsanulok","Phetchabun","Mae Hong Son"]

  month : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  gender : Array<string> =["Male", "Female", "Other"]

  occupation : Array<string> = ["Student","Professor","Merchant","Researcher","Businessman","Doctor","Police","Post man","Engineer","Other"]

  userinfoForm = new FormGroup({
    name : new FormControl(),
    surname : new FormControl(),
    
    address : new FormGroup({
      address : new FormControl(),
      country : new FormControl(),
      region : new FormControl(),
      zipcode : new FormControl(),
      mobile : new FormControl(),
    }),
    gender : new FormControl(),
    occupation : new FormControl(),
    birthdate : new FormControl(),
    birthmonth : new FormControl(),
    birthyear : new FormControl(),
    picture : new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!file.type.match(pattern)){
        alert('invalid format');
        this.userinfoForm.reset();
      }else{
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

}
