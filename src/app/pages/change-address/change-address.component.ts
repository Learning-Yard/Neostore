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
  public userData: any = {};
  constructor(public dialogRef: MatDialogRef<AddressListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private data1: AddressManupulationService, private api: ApiService) { }

  ngOnInit() {
  }
  sub() {
    this.api.listAdress().subscribe((data) => {
      console.log(data);
    });
  }
/**
 *Validaton of the fields in the form is done here
 *
 * @memberof ChangeAddressComponent
 */
AddressFormControl = new FormControl(this.data.addressLine, [
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
/**
 *  The Function takes the data from the form control and
 *  passes it to adress edit form in a dialogue box and also after edit the data is send to api
 * 
 * @param {string} addressLine Adress of the User
 * @param {string} city Users City
 * @param {number} pincode Pincode of the User
 * @param {string} state State
 * @param {string} country Country
 * @memberof ChangeAddressComponent
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
    this.api.updateAdress(editInfo, this.data.id).subscribe((data) => {
      console.log(data);
    });
    this.sub();
  }
/**
 * Method for Closing the dialogue box
 *
 * @memberof ChangeAddressComponent
 */
onNoClick(): void {
    this.dialogRef.close('true');
  }
}
