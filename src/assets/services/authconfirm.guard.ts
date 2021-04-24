import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthconfirmGuard implements CanActivate {
  constructor(private routes : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if((localStorage.getItem("user"))!= null){
    return true;
    }else{
      this.routes.navigate(['/login']);
      return false;
    }
  }
  
}
