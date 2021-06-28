import { Component, OnInit } from '@angular/core';
import { AddressManupulationService } from '../../../assets/services/address-manupulation.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAddressComponent } from '../change-address/change-address.component';
import { ApiService } from '../../../assets/services/api.service';
import { AddAddressComponent } from '../add-address/add-address.component';
/**
 *
 *
 * @export
 * @interface DialogData
 * The Interface for Dialog Data is exported from here
 */
export interface DialogData {
  addressLine: any;
  pincode: any;
  city: any;
  state: any;
  country: any;
  id: string;
}
/**
 *
 *
 * @export
 * @class AddressListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  public address_list: any = [];
  name: any;
  animal: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  country: any;
  id: string = "";
  public addresses: any = []
  constructor(private address_service: AddressManupulationService, public dialog: MatDialog, private api: ApiService) { }



  ngOnInit(): void {
    this.recievedata();
  }
/**
 * This function is for recieving data from api and store it in a variable
 *
 * @memberof AddressListComponent
 */
recievedata() {
    this.api.listAdress().subscribe((data) => {
      this.address_list = data;
      console.log(this.address_list.data.address);
      this.addresses = this.address_list.data.address;
    });
    // this.address_list = this.address_service.senddata();

  }

  // sendindex(i:number){

  // }
/**
 *Resonsible for deleting an address
 *
 * @param {string} id
 * @memberof AddressListComponent
 */
del_address(id: string) {
    if (window.confirm("Do you really want to Delete?")) {
      this.api.deleteAddress(id).subscribe((data) => {
        console.log(data);
        this.recievedata();
      });
    }
  }

  // edit_address(i:number){
  //   this.address_service.editItem(i);
  // }
  // onclick(addressLine:string , city:string , pincode:number ,state:string , country:string ,id:string){

  /**
   * This function is responsible to apen dialogue of edit address 
   *
   * @param {string} addressLine address
   * @param {string} city city
   * @param {number} pincode pincode
   * @param {string} state state
   * @param {string} country country
   * @param {string} id id
   * @memberof AddressListComponent
   */
  openDialog(addressLine: string, city: string, pincode: number, state: string, country: string, id: string): void {
    const dialogRef = this.dialog.open(ChangeAddressComponent, {
      width: 'auto',
      data: {
        addressLine: addressLine,
        city: city,
        pincode: pincode,
        state: state,
        country: country,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.recievedata();
    })
    // this.sendindex(i);
  }
/**
 * OpenDialogue function for adding address
 * on close the data is send to add address api and also the recievedta method is called to update data
 * @memberof AddressListComponent
 */
openDialog2(): void {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: 'auto',
      data: { addressLine: this.address, pincode: this.pincode, city: this.city, state: this.state, country: this.country }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.recievedata();
    })
  }
}
