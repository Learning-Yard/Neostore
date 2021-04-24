import { Injectable, Input } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { RouterModule , Router } from '@angular/router';
// import { LoginComponent } from '../../app/pages/login/login.component'

@Injectable({
  providedIn: 'root'
})
export class AuthcheckService {
  error:string="";
  success:string="";
  user!: SocialUser;
  hide = true;
  loggedIn!: boolean;
  username:any="";

  constructor(private authService: SocialAuthService , private routes: Router) { }

// Signin From Google Call Coming from Login Component
  signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.success="Signed in with Google";
  }
// Signin From FB Call Coming from Login Component
  signInWithFB(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.success="Signed in with Facebook";
  }

  subcriber(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn==true){
        this.sendData(this.user.name);
        this.routes.navigate(['/dashboard/']);
      }
      // this.user.name = this.service.getData();
      else{
        this.routes.navigate(['/login/']);
      }
    });
  }
/**
 *
 *
 * @param {string} name
 * @memberof AuthcheckService
 */
sendData(name:string){
    localStorage.setItem("name",name);
    this.username = localStorage.getItem("name");
  }

  // getData(){
  //   return this.username;
  // }

// Signout Call Coming from Login Component
  signOut(): void {
    // this.authService.signOut();
    // this.subcriber();
    // if(localStorage.getItem("username")!=null){
    localStorage.clear();
    this.routes.navigate(['/login/']);
    // }
    // console.log("Logged Out");
    // console.log(this.user);
  }
}
