import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IData } from '../class/idata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasserService {
  private _url:string = "../data/dummy_dashboard.json";
  getourdata: any;
  dataset="Hello";
  values:any;
  constructor(private http: HttpClient) {
     console.log("Running");
     this.getourdata = ():Observable<IData[]> =>{
    return this.http.get<IData[]>(this._url);
    }
    console.log(this.getourdata)
  }
  get(){
    return this.dataset;
  }
  set(key:any){
    this.dataset=key;
  }
  // pusher(_id:string,category_name:string,product_image:string,category_id:string,created_at:string,__v:number){
  //   this.values = { _id,category_name,product_image,category_id,created_at,__v};
  //   console.log(this.values);
  // }
  reciever(){
    return this.values
  }
}
