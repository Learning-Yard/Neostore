import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { RouterModule , Router } from '@angular/router';
import { AuthcheckService } from '../../../assets/services/authcheck.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  error:string="";
  success:string="";
  user!: SocialUser ;
  hide = true;
  loggedIn!: boolean;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public authService: SocialAuthService , private routes: Router,private service:AuthcheckService) { }

  // Subcription to Provider ID of the social login api which gives account info as object in user object
  ngOnInit(){
    console.log("On Init Call");
  }
  // Call to Sigin in via google in service
  signInWithGoogle(){
    this.service.signInWithGoogle();
    this.service.subcriber();
    // return (this.user)
  }

  senduinfo(){
    return (this.user)
  }
  // Call to Sigin in via fb in service
  signInWithFB(){
    this.service.signInWithFB();
    this.service.subcriber();
    // return (this.user)
  }
// Call to Signout in service
  // signOut(){
  //   this.service.signOut();
  // }
  
// Login Function for standard users
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      // console.log(this.form.value);
      if ((this.form.value.username!="admin") && (this.form.value.password!="super")){
        this.error="Invalid Credentials";
      }
      else{
        this.success="Sign in Successfull";
        this.routes.navigate(['/dashboard/']);
      }
    }
  }

  @Output() submitEM = new EventEmitter();


}
