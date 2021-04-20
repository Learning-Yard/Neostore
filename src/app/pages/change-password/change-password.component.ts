import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators , ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  error: string = "";
  hide = true;
  hide1 = true;
  
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    new_password: new FormControl(''),
    confirm_password: new FormControl(''),
  });

  constructor() { }
  old_password="123kokoko"

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('this.old_password')]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
    }
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit(){
    console.log("Saved");
  }

}
