import { Component, OnInit } from '@angular/core';
import { AddressManupulationService } from '../../../assets/services/address-manupulation.service';
import {MatDialog} from '@angular/material/dialog';
import { ChangeAddressComponent } from '../change-address/change-address.component';

export interface DialogData {
  [x: string]: any;
  animal: string;
  name: string;
  }

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
public address_list:any=[];
  name: any;
  animal: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  country: any;
  i=0;
  constructor(private address_service:AddressManupulationService , public dialog: MatDialog) { }

  

  ngOnInit(): void {
    this.recievedata();
  }

  recievedata(){
    this.address_list = this.address_service.senddata();
    console.log(this.address_list);
  }

  // sendindex(i:number){
    
  // }

  del_address(i:number){
    this.address_service.deleteItem(i);
  }

  // edit_address(i:number){
  //   this.address_service.editItem(i);
  // }

  openDialog(i:number): void {
    const dialogRef = this.dialog.open(ChangeAddressComponent, {
      width: 'auto',
      data: {address: this.address, city:this.city , state:this.state , pincode: this.pincode , country:this.country}
    });
    this.i=i;
    // this.sendindex(i);
}
}
