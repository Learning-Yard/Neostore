import { Injectable } from '@angular/core';
import Address from '../data/dummy_address.json';

@Injectable({
  providedIn: 'root'
})
export class AddressManupulationService {
  public Address_List:{success:boolean,status_code:number,customer_address:{address_id:number , customer_id:number , address:string , pincode:number , city:string , state:string , country:string , isDeliveryAddress:boolean , createdAt:string , updatedAt:string}[]}= Address;
  public Filterarray=this.Address_List.customer_address;
  public address_length= this.Filterarray.length;
  public userDataId: any
  public DataId: any

  constructor() { }

  addItem(event:any){
    this.Filterarray.push(event)
    this.address_length = this.Filterarray.length;
    console.log('filterarray new',this.Filterarray);
  }
  public deleteItem(_id: any) {
    this.Filterarray.splice(_id-1, 1);
    this.address_length = this.Filterarray.length;
    console.log(_id);
}
editItem(_id: number){
  let address = this.Filterarray[_id-1].address;
  let city = this.Filterarray[_id-1].city;
  let pincode = this.Filterarray[_id-1].pincode;
  let country = this.Filterarray[_id-1].country;
  let result1:any = prompt("Edit Address", address);
  let result2:any = prompt("Edit City", city);
  // let result3 = prompt("Edit Task Title", pincode);
  let result4:any = prompt("Edit Country", country);
  if ((result1 !== null && result1 !== "") || (result2 !== null && result2 !== "") || (result4 !== null && result4 !== "")){
    this.Filterarray[_id-1].address = result1;
    this.Filterarray[_id-1].city = result2;
    this.Filterarray[_id-1].country = result4;
  }
}
senddata(){
  return this.Filterarray;
}

}
