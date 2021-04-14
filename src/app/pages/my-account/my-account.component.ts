import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../../../assets/services/profile-data.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
profile:any=[]
  constructor(private service:ProfileDataService) { }

  ngOnInit(){
    this.profile = this.service.UserProfile;
    console.log(this.profile);
  }

}
