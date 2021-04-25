import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, AddressListComponent } from '../address-list/address-list.component';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../assets/services/api.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddressListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData , private api:ApiService) { }
    public userData:any={};
    ngOnInit(): void {
      this.sub();
    }
  
  sub(){
    this.api.listAdress().subscribe((data)=>{
      let needdata = data;
      this.userData = needdata;
    });
  }

  addressLine = this.userData.addressLine;
  city = this.userData.city;
  pincode = this.userData.pincode;
  country = this.userData.country;

  AddressFormControl = new FormControl(this.addressLine, [
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
    this.api.addAddress(editInfo).subscribe((data) =>{
      console.log(data);
      this.sub();
    })
    // this.data1.editItem(this.index,editInfo)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
