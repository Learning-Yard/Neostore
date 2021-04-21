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
  public i:number=0;

  constructor() { }
// recieveindex(){
// }

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
editItem(_id: number, _editinfo:{address:string , city:string , state:string , pincode:number , country:string}){
  // let address = this.Filterarray[_id].address;
  // let city = this.Filterarray[_id].city;
  // let pincode = this.Filterarray[_id].pincode;
  // let country = this.Filterarray[_id].country;
  this.Filterarray[_id].address = _editinfo.address;
  this.Filterarray[_id].city = _editinfo.city;
  this.Filterarray[_id].pincode = _editinfo.pincode;
  this.Filterarray[_id].country = _editinfo.country;

  // let result1:any = prompt("Edit Address", address);
  // let result2:any = prompt("Edit City", city);
  // // let result3 = prompt("Edit Task Title", pincode);
  // let result4:any = prompt("Edit Country", country);
  // if ((result1 !== null && result1 !== "") || (result2 !== null && result2 !== "") || (result4 !== null && result4 !== "")){
  //   this.Filterarray[_id].address = result1;
  //   this.Filterarray[_id].city = result2;
  //   this.Filterarray[_id].country = result4;
  // }
}
senddata(){
  return this.Filterarray;
}

}
