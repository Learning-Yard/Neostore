import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../../../assets/services/profile-data.service';
// import {MatDialog} from '@angular/material/dialog';
// import { DialogueProfileComponent } from '../dialogue-profile/dialogue-profile.component';
import { ProfileComponent } from '../profile/profile.component'
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddressListComponent } from '../address-list/address-list.component';

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

  profile:any=[]
  name: any;
  animal: any;
  isProfile=true;
  isChangePassword=false;
  isAddress=false;
  key=1;

  constructor(private service:ProfileDataService) { }

  ngOnInit(){
    this.profile = this.service.UserProfile;
    console.log(this.profile);
  }
  
  change(key:number){
    if (key===1){
      this.isProfile=true;
      this.isChangePassword=false;
      this.isAddress=false;
    }
    if (key===2){
      this.isProfile=false;
      this.isChangePassword=true;
      this.isAddress=false;
    }
    if (key===3){
      this.isProfile=false;
      this.isChangePassword=false;
      this.isAddress=true;
    }
  }
}
