import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../../../assets/services/profile-data.service';
// import {MatDialog} from '@angular/material/dialog';
// import { DialogueProfileComponent } from '../dialogue-profile/dialogue-profile.component';
import { ProfileComponent } from '../profile/profile.component'
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddressListComponent } from '../address-list/address-list.component';
import { OrderComponent } from '../order/order.component';

export interface DialogData {
  [x: string]: any;
  animal: string;
  name: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})

export class MyAccountComponent implements OnInit {

  profile: any = []
  name: any;
  animal: any;
  isProfile=this.service.isProfile;
  isChangePassword=this.service.isChangePassword;
  isAddress=this.service.isAddress;
  isOrder=this.service.isOrder;
  key = 1;

  constructor(private service: ProfileDataService) { }

  ngOnInit() {
    this.profile = this.service.UserProfile;
    console.log(this.profile);
  }

  change(key:number){
    if (key===1){
      this.service.isProfile=true;
      this.service.isChangePassword=false;
      this.service.isAddress=false;
      this.service.isOrder=false;
      this.isProfile=this.service.isProfile;
      this.isChangePassword=this.service.isChangePassword;
      this.isAddress=this.service.isAddress;
      this.isOrder=this.service.isOrder;
    }
    if (key===2){
      this.service.isProfile=false;
      this.service.isChangePassword=true;
      this.service.isAddress=false;
      this.service.isOrder=false;
      this.isProfile=this.service.isProfile;
      this.isChangePassword=this.service.isChangePassword;
      this.isAddress=this.service.isAddress;
      this.isOrder=this.service.isOrder;
    }
    if (key===3){
      this.service.isProfile=false;
      this.service.isChangePassword=false;
      this.service.isAddress=true;
      this.service.isOrder=false;
      this.isProfile=this.service.isProfile;
      this.isChangePassword=this.service.isChangePassword;
      this.isAddress=this.service.isAddress;
      this.isOrder=this.service.isOrder;
    }
    if(key===4){
      this.service.isProfile=false;
      this.service.isChangePassword=false;
      this.service.isAddress=false;      
      this.service.isOrder=true;
      this.isProfile=this.service.isProfile;
      this.isChangePassword=this.service.isChangePassword;
      this.isAddress=this.service.isAddress;
      this.isOrder=this.service.isOrder;
    }
  }
}
