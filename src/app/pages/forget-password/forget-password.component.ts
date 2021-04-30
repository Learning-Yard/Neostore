import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../../assets/services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  error: string = "";

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  constructor(private routes: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    }
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit() {
    let formdata = this.form.value;
    this.api.forgetPasswordP1(formdata).subscribe(
      ((res: any) => {
        this.routes.navigate(['/forget-password-next']);
        console.log(res);
      }), (error) => {
        alert('Email Does not exist')
        console.log('from catch');
      })
  }
}
