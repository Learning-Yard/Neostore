import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators , ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forget-password-next',
  templateUrl: './forget-password-next.component.html',
  styleUrls: ['./forget-password-next.component.scss']
})
export class ForgetPasswordNextComponent implements OnInit {
  error: string = "";
  hide = true;
  hide1 = true;
  
  form: FormGroup = new FormGroup({
    v_code: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });
  
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      v_code: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9\s]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
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
