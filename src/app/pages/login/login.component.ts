import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { RouterModule, Router } from '@angular/router';
import { AuthcheckService } from '../../../assets/services/authcheck.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string = "";
  success: string = "";
  user!: SocialUser;
  hide = true;
  /**
   * username : Username of the user
   * passsword : password of the user
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  /**
   * Creates an instance of LoginComponent.
   * @param {SocialAuthService} authService // Social Auth Service for FB and Google login
   * @param {Router} routes // for routing services
   * @param {AuthcheckService} service // authcheckservice has all checking functionality of the auth functions in this file
   * @memberof LoginComponent
   */
  constructor(public authService: SocialAuthService, private routes: Router, private service: AuthcheckService) { }

  // Subcription to Provider ID of the social login api which gives account info as object in user object
  ngOnInit() {
    console.log("On Init Call");
  }
  // Call to Sigin in via google in service
  signInWithGoogle() {
    this.service.signInWithGoogle();
    this.service.subcriber();
    // return (this.user)
  }

  senduinfo() {
    return (this.user)
  }
  // Call to Sigin in via fb in service
  signInWithFB() {
    this.service.signInWithFB();
    this.service.subcriber();
    // return (this.user)
  }
  // Call to Signout in service
  // signOut(){
  //   this.service.signOut();
  // }

  // Login Function for standard users using Event Emitter method
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      // console.log(this.form.value);
      if ((this.form.value.username != "admin") && (this.form.value.password != "super")) {
        this.error = "Invalid Credentials";
      }
      else {
        this.success = "Sign in Successfull";
        this.routes.navigate(['/dashboard/']);
      }
    }
  }

  @Output() submitEM = new EventEmitter();

}
