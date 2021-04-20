// import { Directive, Input } from "@angular/core";
// import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

// @Directive({
//     selector:'[ConfirmPasswordValidator]',
//     providers:[{
//         provide: NG_VALIDATORS,
//         useExisting: ConfirmPasswordValidatorDirective,
//         multi:true
//     }]
// })

//  export class ConfirmPasswordValidatorDirective implements Validator{
//      @Input()
//     ConfirmPasswordValidator!: string;
//     validate(control:AbstractControl):{[key:string] : any} | null{
//         const compare_to_control = control.parent?.get(this.ConfirmPasswordValidator);
//         if(compare_to_control && compare_to_control.value !== control.value){
//             return {'notEqual':true};
//         }else{
//             return null;
//         }
//     }
//  }