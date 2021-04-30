import { Injectable } from '@angular/core';
import ProfileData from '../../assets/data/dummy_profile.json';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  public isProfile=true;
  public isChangePassword=false;
  public isAddress=false;
  public isOrder=false;
  
  public UserProfile: {success:boolean , status_code:number , customer_proile: {
    customer_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_no: string;
    gender: string;
    dob: string;
    profile_img: string;
    otp: string;
    createdAt: string;
    updatedAt: string;
    };
   } = ProfileData

  constructor() { }

  getUserProfile() {
    return this.UserProfile;
  }
}
