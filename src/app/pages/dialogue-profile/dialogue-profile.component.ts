import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, MyAccountComponent } from '../my-account/my-account.component';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileDataService } from '../../../assets/services/profile-data.service';

@Component({
  selector: 'app-dialogue-profile',
  templateUrl: './dialogue-profile.component.html',
  styleUrls: ['./dialogue-profile.component.scss']
})
export class DialogueProfileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MyAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private data1: ProfileDataService
  ) {}

  public userData = this.data1.getUserProfile();

  onNoClick(): void {
    this.dialogRef.close();
    console.log(document.getElementById('profilePic1'));
  }

   
  ngOnInit(): void {
    console.log(document.getElementById('profilePic1'));
    
  }

  // public userModel = new EditInfo("","");

  // validator for first name
  // public name = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z]*'),
  // ]);

  // getErrorMessageForName() {
  //   if (this.name.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.name.hasError('name')
  //     ? 'Must include only alphabets'
  //     : 'Must include only alphabets';
  // }
  firstName = this.userData.customer_proile.first_name;
  lastName = this.userData.customer_proile.last_name;
  email = this.userData.customer_proile.email;
  phone = this.userData.customer_proile.phone_no;
  gender = this.userData.customer_proile.gender;
  dob = this.userData.customer_proile.dob;
  profilePic = this.userData.customer_proile.profile_img;

  firstNameFormControl = new FormControl(this.firstName, [
    Validators.required,
    Validators.pattern('[a-zA-Z]*'),
  ]);

  lastNameFormControl = new FormControl(this.lastName, [
    Validators.required,
    Validators.pattern('[a-zA-Z]*'),
  ]);

  emailFormControl = new FormControl(this.email, [
    Validators.required,
    Validators.pattern(
      '[^0-9]([a-zA-Z0-9+_.-])+[@]+[a-zA-Z0-9]+[.]+[a-z]{2,4}$'
    ),
  ]);

  phoneFormControl = new FormControl(this.phone, [
    Validators.required,
    Validators.pattern('^[6-9][0-9]{9}$'),
  ]);

  public genderFormControl = new FormControl(this.gender, [
    Validators.required,
  ]);

  dobFormControl = new FormControl(this.dob, [Validators.required]);

  profilePicFormControl = new FormControl(this.profilePic, [
    Validators.required,
  ]);

  
  // public firstName = new FormControl(this.f)
  // public lastName = new FormControl('')
  // public gender = new FormControl('')
  // public dob = new FormControl('')
  // public email = new FormControl('')
  // public phone = new FormControl('')

  onSubmit(
    fname: string,
    lname: string,
    gender: string,
    dob: string,
    email: string,
    phone: string
  ) {
    // console.log(data );
    let editInfo = {
      first_name: fname,
      last_name: lname,
      gender: gender,
      dob: dob,
      email: email,
      phone_no: phone,
      // "profile_img":"image_1574053862482_naveen.jpeg"
    };
    console.log(editInfo);
  }

  // url:any = '';
  // onSelectFile(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  /**
   * just redirect to order page
   * @memberof DialogProfileComponent
   */
  // onOrderClick() {
  //   this.router.navigate(['/order']);
  // }

  // onProfileClick() {
  //   this.router.navigate(['/profile']);
  // }

  // onAddressClick() {
  //   this.router.navigate(['/address']);
  // }

  // onChangePasswordClick() {
  //   this.router.navigate(['/changepassword']);
  // }


}
