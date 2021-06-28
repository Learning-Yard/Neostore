import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { RouterModule, Router } from '@angular/router';
import { AuthcheckService } from '../../../assets/services/authcheck.service';
import { ApiService } from '../../../assets/services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
   * email : Email of the user
   * passsword : password of the user
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  /**
   * Creates an instance of LoginComponent.
   * @param {SocialAuthService} authService // Social Auth Service for FB and Google login
   * @param {Router} routes // for routing services
   * @param {AuthcheckService} service // authcheckservice has all checking functionality of the auth functions in this file
   * @memberof LoginComponent
   */
  constructor(public authService: SocialAuthService, private service: AuthcheckService, private base: ApiService, private routes: Router, private ngxLoader: NgxUiLoaderService) { }

  // Subcription to Provider ID of the social login api which gives account info as object in user object
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
    });
  }
/**
 * Error message part is handeled here
 * 
 * @param {string} controlName Form Control name
 * @param {string} errorName error string
 * @memberof LoginComponent
 */
public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  // Call to Sigin in via google in service
  signInWithGoogle() {
    this.service.signInWithGoogle();
    this.service.subcriber();
  }

  senduinfo() {
    return (this.user)
  }
  // Call to Sigin in via fb in service
  signInWithFB() {
    this.service.signInWithFB();
    this.service.subcriber();
  }

  // Login Function for standard users using Event Emitter method
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      let formdata = this.form.value;
      console.log(formdata);
      this.ngxLoader.start();
      this.base.loginCheck(formdata).subscribe(
        ((res: any) => {
          localStorage.setItem("user", JSON.stringify(res.data))
          this.routes.navigate(['/dashboard/']).then(() => { location.reload() });
          this.ngxLoader.stop();
        }), (error) => {
          alert('Invalid username or password')
          console.log('from catch');
          this.ngxLoader.stop();
        })
    }
  }

  @Output() submitEM = new EventEmitter();

}
