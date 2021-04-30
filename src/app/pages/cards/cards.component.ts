import { Component, OnInit } from '@angular/core';
import UserData from '../../../assets/data/dummy_dashboard.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../assets/services/api.service';
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
// import {ProductComponent} from '../product/product.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public products: { _id: string, category_name: string, product_image: string, category_id: string, created_at: string, __v: number }[] = UserData;
  public topFive: any
  public snackMsg: string = "";
  constructor(private routes: Router, private api: ApiService, private _snackBar: MatSnackBar, private time: AppComponent) { }
  public token: any;
  ngOnInit(): void {
    // this.token = this.data.token
    this.api.topFiveProductGet().subscribe((info) => {
      this.topFive = info
      console.log(this.topFive);

    })
    console.log("token", this.token);

  }

  onCardClick(_id: string) {
    this.routes.navigate(['/product/' + _id]);
  }

  addToCart(productId: string) {
    let data = {
      productId: productId,
      quantity: 1,
    };

    // // Id comes from the selection of user 
    // passdata(_id: string) {
    //   console.log(_id);

    // }

    this.api.addProductsInCartPost(data).subscribe(
      (info) => {
        console.log('data :', info);
        this.snackMsg = "Product Added"
        this.api.listProductsInCartGet().subscribe((info) => {
          // this.api.cartValue = info.data.products.length
          // this.cartValue = this.data.cartValue
          // console.log(this.cartValue);        
        })
        this.openSnackBar()
        this.time.starttimer();
      },
      (error) => {
        let msg;
        msg = error;
        this.snackMsg = error.error.message
        this.openSnackBarError()
        console.log(error.error.message);
      }
    );
  }

  openSnackBar() {
    this._snackBar.open(this.snackMsg, 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['greenYesMatch']

    });
  }

  openSnackBarError() {
    this._snackBar.open(this.snackMsg, 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['redNoMatch']
    });
  }

}
