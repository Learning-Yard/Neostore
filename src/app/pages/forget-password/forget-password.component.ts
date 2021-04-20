import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators , ValidatorFn, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  error: string = "";

  form: FormGroup = new FormGroup({
    f_name: new FormControl(''),
    l_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    phone_number: new FormControl(''),
    gender: new FormControl(''),
  });

  constructor(private routes:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    }
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit(){
    this.routes.navigate(['/forget-password-next']);
  }
}
