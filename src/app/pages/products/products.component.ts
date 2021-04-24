import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

const desserts: Dessert[] = [
  { name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4 },
  { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
  { name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4 },
  { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4 },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  form: FormGroup;

  collection = Array();
  c = Array();
  c1 = Array();
  xyz = Array();
  public dataCategory = Array();
  public colorCategory = Array();

  p: number = 1;
  public shown = Array();
  abc = desserts;
  public categories = [
    'General',
    'Exotic',
    'Extreme',
    'Extreme',
    'General',
    'Water',
    'Extreme',
  ].filter(
    (value, index, categoryArray) => categoryArray.indexOf(value) === index
  );
  dataSource = new MatTableDataSource(desserts);

  // sortedData: Dessert[];

  // @ViewChild(MatSort) sort: MatSort;
  // public productList = this.data.getProductList();
  public productList:any;
  public category1 = Array();
  public category = Array();
  public categoryColor1 = Array();
  public categoryColor = Array();
  checkBoxInstance: any;
  public a: any[] = ['a', 'b', 'c', 'd', 'e'];
  ngOnInit() {
    console.log(this.productList);

    this.api.getProductList().subscribe((info) => {
      this.productList = info
      console.log((this.productList.data.docs[0]));
    });
    
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    for (let i = 1; i <= 10; i++) {
      this.collection.push(`item ${i}`);
    }

    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required]),
    });
  }

  onCheckboxChange(e: any) {
    const website = this.form.get('website') as FormArray;

    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
      this.xyz.push(new FormControl(e.target.value));
    } else {
      const index = website.controls.findIndex(
        (x) => x.value === e.target.value
      );

      website.removeAt(index);
      this.xyz.splice(index, 1);
    }
  }

  submit() {
    // this.dataCategory = this.form.value;
    console.log('datacategory', this.dataCategory);
    console.log('xyz', this.xyz.length);

    for (let i = 0; i < this.xyz.length; i++) {
      this.dataCategory[i] = this.xyz[i].value;
      console.log('i:', i);
    }

    console.log(this.form.value);
    this.dataCategory = this.form.value;
    console.log(this.dataCategory);
    this.router.navigate(['/products']);
  }

  //  collection = [1,2,3,45]
  collection1 = [
    { name: 'A', price: 100 },
    { name: 'B', price: 200 },
    { name: 'C', price: 300 },
    { name: 'D', price: 400 },
    { name: 'E', price: 500 },
    { name: 'F', price: 600 },
    { name: 'G', price: 700 },
    { name: 'H', price: 800 },
    { name: 'I', price: 900 },
  ];

  getCategory($event: any, category: string) {
    console.log($event);

    let a = document.getElementById('1');
    // console.log($event);
    // if($event == true){
    // console.log("vishal");
    // }
    // console.log("isChecked",$event.isChecked);
    console.log(category);
    // console.log(this.c.includes(category));

    this.c.push(category);
  }

  getColor(color: any) {
    this.c1.push(color);
  }

  applyColor() {
    this.colorCategory = this.c1;
    this.router.navigate(['/products']);
  }

  public az = false;
  applyCategory(checkBox: any) {
    console.log('h', checkBox);
    let categoryClass = document.getElementsByClassName('categoryClass');
    console.log('categoryClass.length', categoryClass.length);
    console.log('categoryClass.length', categoryClass[0]);

    for (let i = 0; i < categoryClass.length; i++) {
      if (categoryClass[0]) {
        console.log('true');
      }
    }

    console.log('1');
    this.dataCategory = this.c;
    this.colorCategory = this.c;
    this.router.navigate(['/products']);
  }
  // listproduct(name: any,lastName: any,email: any,phone: any,gender: any,password: any,confirmPassword: any) {
  //   let reg = {
  //     firstName: name,
  //     lastName: lastName,
  //     email: email,
  //     mobile: phone,
  //     gender: gender,
  //     password: password,
  //     confirm_password: confirmPassword
  // }

  // this.data.registrationPost(reg).subscribe((info) =>{
  //   console.log("data :",info);
  //   this.router.navigate(['/login']);
  //   },(error) => {
  //     let msg
  //     msg = error
  //     console.log(error);
  //     alert(msg.error.message)
  //   })
  // }
}
