import { Component, OnInit } from '@angular/core';
import { AddressManupulationService } from '../../../assets/services/address-manupulation.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
public address_list:any=[];
  constructor(private address_service:AddressManupulationService) { }

  

  ngOnInit(): void {
    this.recievedata();
  }

  recievedata(){
    this.address_list = this.address_service.senddata();
    console.log(this.address_list);
  }

  del_address(i:number){
    this.address_service.deleteItem(i);
  }

  edit_address(i:number){
    this.address_service.editItem(i);
  }

}
