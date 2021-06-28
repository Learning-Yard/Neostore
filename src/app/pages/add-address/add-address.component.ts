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
/**
 * Creates an instance of AddAddressComponent.
 * @param {MatDialogRef<AddressListComponent>} dialogRef Reference to Matdialog service
 * @param {DialogData} data data to be send to dialog 
 * @param {ApiService} api api comes from here
 * @memberof AddAddressComponent
 */
constructor(public dialogRef: MatDialogRef<AddressListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private api: ApiService) { }
  public userData: any = {};
  ngOnInit(): void {
    this.api.listAdress().subscribe((data) => {
      let needdata = data;
      this.userData = needdata;
    });
  }

  // sub(){

  // }
/**
 *Validators of the fields in the formm
 *
 * @memberof AddAddressComponent
 */
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
/**
 *
 *
 * @param {string} addressLine Adress of the user
 * @param {string} city City of the User
 * @param {number} pincode  Pincode of the User
 * @param {string} state  State of the User
 * @param {string} country  Country of the User
 * @memberof AddAddressComponent
 * 
 * Edit info part is class format in which data is defined it is then passed to service and subscribed 
 */
onSubmit(
    addressLine: string,
    city: string,
    pincode: number,
    state: string,
    country: string,
  ) {
    let editInfo = {
      addressLine: addressLine,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
    };
    console.log(editInfo);
    this.api.addAddress(editInfo).subscribe((data) => {
      console.log(data);
      this.api.listAdress().subscribe((data) => {
        let needdata = data;
        this.userData = needdata;
      });
    })
  }

  // Cancel logic of Dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

}
