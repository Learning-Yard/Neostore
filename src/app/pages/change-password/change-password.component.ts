import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators , ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from '../../../assets/services/api.service';
import { RouterModule, Router } from '@angular/router';

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

  constructor(private api:ApiService , private route:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9\s]+')]),
    }
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit(){
    console.log("Saved");
    let token = localStorage.getItem("user.data.token");
    let formdata={password:this.form.value.password , newPassword:this.form.value.new_password};
    console.log(formdata)
    this.api.changePassword(formdata).subscribe(
      ((res:any) => {
      console.log(res);  
      this.route.navigate(['/dashboard/']);
    }),(error)=>{
      alert('Invalid Password')
      console.log('from catch');
    })
  }

}
