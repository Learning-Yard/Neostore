import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:string="";
  success:string="";
  user!: SocialUser;
  loggedIn!: boolean;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: SocialAuthService , private routes: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    if (this.loggedIn==null){
      this.routes.navigate(['/login/']);
    }
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.success="Signed in with Google";
    this.routes.navigate(['/dashboard/']);
    // console.log(this.user);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.success="Signed in with Facebook";
    this.routes.navigate(['/dashboard/']);
    // console.log(this.user);
  }

  signOut(): void {
    this.authService.signOut();
    this.routes.navigate(['/login/']);
    // console.log("Logged Out");
    // console.log(this.user);
  }
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
