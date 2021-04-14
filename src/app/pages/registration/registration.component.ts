import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { RouterModule, Router } from '@angular/router';
import { AuthcheckService } from '../../../assets/services/authcheck.service';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  error: string = "";
  success: string = "";
  user!: SocialUser;
  hide = true;
  /**
   * here all the fields of the form is recieved using formcontrol property
   * f_name - first name
   * l_name - last name
   * email - email id
   * password - password
   * confirm_password - confirm password
   * gender - gender
   * @type {FormGroup}
   * @memberof RegistrationComponent
   */
  form: FormGroup = new FormGroup({
    f_name: new FormControl(''),
    l_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    gender: new FormControl(''),
  });
  /**
   * Creates an instance of RegistrationComponent.
   * @param {SocialAuthService} authService // Social Login Auth service
   * @param {Router} routes // Router is to route to pages 
   * @param {AuthcheckService} service // custom authchecker service where validation is performed 
   * @memberof RegistrationComponent
   */
  constructor(public authService: SocialAuthService, private routes: Router, private service: AuthcheckService) { }

  // Subcription to Provider ID of the social login api which gives account info as object in user object
  ngOnInit(): void {
    this.form = new FormGroup({
      f_name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z]*')]),
      l_name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
      phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      gender: new FormControl('', [Validators.required]),
    }
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
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

  // Form Submit Method accepts the value from forms using EventEmitter
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      // console.log(this.form.value);
      // if ((this.form.value.username!="admin") && (this.form.value.password!="super")){
      //   this.error="Invalid Credentials";
      // }
      // else{
      //   this.success="Sign in Successfull";
      //   this.routes.navigate(['/dashboard/']);
      // }
    }
  }

  @Output() submitEM = new EventEmitter();


}
