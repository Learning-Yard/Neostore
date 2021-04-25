import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, AddressListComponent } from '../address-list/address-list.component';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddressManupulationService } from '../../../assets/services/address-manupulation.service';
import { ApiService } from '../../../assets/services/api.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})

export class ChangeAddressComponent implements OnInit {
public userData:any={};
  constructor(    public dialogRef: MatDialogRef<AddressListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData , private data1: AddressManupulationService , private api:ApiService) { }

  

  ngOnInit(){
    // this.sub();
  }
  sub(){
    this.api.listAdress().subscribe((data)=>{
      console.log(data);
    });
  }
// sub(){
//   this.api.listAdress().subscribe((data)=>{
//     this.userData = data;
//     console.log(data)
//   });
// }
  // index = this.al.sendindex()
  // addressLine = this.userData.addressLine;
  // city = this.userData.city;
  // pincode = this.userData.pincode;
  // country = this.userData.country;

  AddressFormControl = new FormControl(this.data.addressList, [
    Validators.required,
  ]);

  CityFormControl = new FormControl(this.data.city, [
    Validators.required,
  ]);

  PincodeFormControl = new FormControl(this.data.pincode, [
    Validators.required,
  ]);

  StateFormControl = new FormControl(this.data.state, [
    Validators.required,
  ]);

  CountryFormControl = new FormControl(this.data.country, [
    Validators.required,
  ]);

  onSubmit(
    addressLine: string,
    city: string,
    pincode: number,
    state: string,
    country: string,
  ) {
    // console.log(data );
    let editInfo = {
      addressLine: addressLine,
      city: city,
      state : state,
      pincode: pincode,
      country: country,
    };
    console.log(editInfo);
    this.api.updateAdress(editInfo,this.data.id).subscribe((data)=>{
      console.log(data);
    });
    // this.data1.editItem(this.index,editInfo)
  }

  onNoClick(): void {
    this.dialogRef.close('true');
    this.sub();
  }
}
