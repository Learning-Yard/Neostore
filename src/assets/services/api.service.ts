import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule , Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="https://neostore-api.herokuapp.com";

  constructor(private http:HttpClient) { }

  // public getbaseurl(){
  //   return (`${this.url}`);
  // }

  loginCheck(formdata:any):Observable<any>{
    return this.http
    .post(`${this.url}/api/auth/login`, formdata)
  }
  
  registrationCheck(data: any): Observable<any>{
    return this.http.post(this.url + '/api/auth/register', data)
  }

  forgetPasswordP1(data:any):Observable<any>{
    return this.http.post(this.url + '/api/auth/forgot-password',data )
  }

  changePassword(data:object):Observable<any>{
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    console.log(user2.token)
    // const headers = new HttpHeaders({'Authorization':user2.token , 'content-type': 'application/json'});
    // let options = {headers:headers}
    return this.http.post(this.url + '/api/user/change-password',data,{ headers: { Authorization: user2.token}})
  }

  // getProductList():Observable<any> {
  //   return this.http.get(this.url + '/api/product' )
  // }

  getProductList(): Observable<any>{
    return this.http.get(this.url + 'api/product')
  }

  // addressedit(data:any):Observable<any>{
  //   return this.http.post(this.url + '/api/auth/register', data)
  // }
}
