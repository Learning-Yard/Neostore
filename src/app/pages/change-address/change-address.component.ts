import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, AddressListComponent } from '../address-list/address-list.component';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddressManupulationService } from '../../../assets/services/address-manupulation.service';


@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {



  constructor(    public dialogRef: MatDialogRef<AddressListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData , private data1: AddressManupulationService) { }

  
  ngOnInit(): void {
    
  }
  public userData = this.data1.senddata();
  // index = this.al.sendindex()
  address = this.userData[0].address;
  city = this.userData[0].city;
  pincode = this.userData[0].pincode;
  country = this.userData[0].country;

  AddressFormControl = new FormControl(this.address, [
    Validators.required,
  ]);

  CityFormControl = new FormControl(this.city, [
    Validators.required,
  ]);

  PincodeFormControl = new FormControl(this.pincode, [
    Validators.required,
  ]);

  StateFormControl = new FormControl(this.country, [
    Validators.required,
  ]);

  CountryFormControl = new FormControl(this.country, [
    Validators.required,
  ]);

  onSubmit(
    _address: string,
    city: string,
    pincode: number,
    state: string,
    country: string,
  ) {
    // console.log(data );
    let editInfo = {
      address: _address,
      city: city,
      state : state,
      pincode: pincode,
      country: country,
    };
    console.log(editInfo);
    // this.data1.editItem(this.index,editInfo)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
