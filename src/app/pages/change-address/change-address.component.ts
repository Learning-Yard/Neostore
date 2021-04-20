import { Component, OnInit } from '@angular/core';
import Address from '../../../assets/data/dummy_address.json';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {

  public Address_List:{success:boolean,status_code:number,customer_address:{address_id:number , customer_id:number , address:string , pincode:number , city:string , state:string , country:string , isDeliveryAddress:boolean , createdAt:string , updatedAt:string}[]}= Address;
  // public uid=(<HTMLElement> document.getElementById("id"));
  public Filterarray=this.Address_List.customer_address;
  public userDataId: any
  public DataId: any

  constructor() { }

  ngOnInit(): void {
    console.log(this.Filterarray);
  }

  addItem(event:any){
    this.Filterarray.push(event)
    console.log('filterarray new',this.Filterarray);
  }
  public deleteItem(_id: any) {
    this.Filterarray.splice(_id-1, 1);
    console.log(_id);
}
// editItem(_id: number){
//   let title = this.Filterarray[_id-1].c;
//   let result = prompt("Edit Task Title", title);
//   if (result !== null && result !== ""){
//     this.Filterarray[_id-1].title = result;
//   }

}
