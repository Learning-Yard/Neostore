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
    return this.http.get(this.url + '/api/product')
  }

  // addressedit(data:any):Observable<any>{
  //   return this.http.post(this.url + '/api/auth/register', data)
  // }

  listCategoryGet(): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&category=6065c425f45ada6429eb42c9')
  }
  
  listColorGet(): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&color=6065ca24cec0196a6fe56e3d')
  }
  
  sortByPriceAscGet(): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&sortby=price&orderby=asc')
  }
  
  sortByPriceDescGet(): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&sortby=price&orderby=desc')
  }
  
  
  sortByRatingDescGet(): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&sortby=rating&orderby=desc')
  }

    // list out products inside cart by get method and passing token to it
  listProductsInCartGet(): Observable<any>{
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.get(this.url + '/api/cart',{ headers: { Authorization: user2.token}})
  }

  // adding products inside cart by post method and passing body and token to it
  addProductsInCartPost(data:any): Observable<any>{
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.post(this.url + '/api/cart',data,{ headers: { Authorization: user2.token}})
  }

  cartList(data:any):Observable<any>{
    return this.http.get(this.url + '/api/cart',{ headers: { Authorization: data}})
  }

  updateCartQuantity(product_id:string ,quantity:any){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.put(this.url + '/api/cart/'+product_id,quantity,{ headers: { Authorization: user2.token}})
  }

  updateAdress(data:any , id:string){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.put(this.url + '/api/user/address/'+id,data,{ headers: { Authorization: user2.token}})
  }

  listAdress(){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.get(this.url + '/api/user/address',{ headers: { Authorization: user2.token}})
  }

  addAddress(data:any){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.post(this.url + '/api/user/address/',data,{ headers: { Authorization: user2.token}})
  }

  deleteAddress(id:string){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.delete(this.url + '/api/user/address/'+id,{ headers: { Authorization: user2.token}})
  }

  orderList(){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.get(this.url + '/api/order',{ headers: { Authorization: user2.token}})    
  }

}
