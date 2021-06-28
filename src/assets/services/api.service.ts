import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="https://neostore-api.herokuapp.com";

  toko:any = (localStorage.getItem("user"));
  token_it:any = JSON.parse(this.toko);
  public cartValue:number | undefined
  public fireStoreToken:any;
  public fireToken="key=AAAAkq4olhk:APA91bEs7WxE_syK8kUOmvJEGl2kI0pc0GEJcEkDKgJI6mroXLrXK-rjOTh1HKeDJrZ2fp7dQWAP8c8VY8oV1VKoIwDJHQuy_v5GVi4jQ4WmyyXJybBkgVm09tzelIiqboqCgHiBMtTy";
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
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000')
  }

  // addressedit(data:any):Observable<any>{
  //   return this.http.post(this.url + '/api/auth/register', data)
  // }

  listAllCategoryGet(): Observable<any>{
    return this.http.get(this.url + '/api/category')
  }

  listAllColorGet(): Observable<any>{
    return this.http.get(this.url + '/api/color')
  }

  listCategoryGet(id:any): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&category='+id)
  }

  listColorGet(id:any): Observable<any>{
    return this.http.get(this.url + '/api/product?limit=100000&page=1..1000&color='+id)
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

  cartList():Observable<any>{
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.get(this.url + '/api/cart',{ headers: { Authorization: user2.token}})
  }

  cartProductDelete(id:string){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.delete(this.url + '/api/cart/'+id,{ headers: { Authorization: user2.token}})
  }

  updateCartQuantity(quantity:any ,product_id:string){
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

  topFiveProductGet(): Observable<any>{
  return this.http.get(this.url + '/api/product?limit=5&page=1..1000&sortby=rating&orderby=desc')
  }

  checkout(data:string){
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    return this.http.post(this.url + '/api/order/place',data,{ headers: { Authorization: user2.token}})
  }

  pushNotification(data:any){
    return this.http.post("https://fcm.googleapis.com/fcm/send",data,{ headers: {Authorization:this.fireToken}})
  }

}
