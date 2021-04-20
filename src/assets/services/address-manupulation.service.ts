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
// editItem(_id: number){
//   let title = this.Filterarray[_id-1].c;
//   let result = prompt("Edit Task Title", title);
//   if (result !== null && result !== ""){
//     this.Filterarray[_id-1].title = result;
//   }
senddata(){
  return this.Filterarray;
}

}
