import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/assets/services/api.service';
import { DialogCartComponent } from '../dialog-cart/dialog-cart.component';
import { AppComponent } from '../../app.component';

export interface DialogData {
  name: string;
  img: any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() quantity = Array();
  @Input() subTotal: number = 0;
  public x = 0;
  public cartInfo: any; 
  public cartData = this.api.cartList(); //CartData in the CartList
  name: any;
  animal: any;
/**
 * Thw List products in cart get is responsiblefor lising out all data in cart 
 * Creates an instance of CartComponent.
 * @param {ApiService} api api service
 * @param {MatDialog} dialog dialogue
 * @param {AppComponent} time timer service
 * @memberof CartComponent
 */
constructor(private api: ApiService, public dialog: MatDialog , private time:AppComponent) {}
  ngOnInit() {
    console.log(this.quantity);
    console.log(this.quantity[1]);
    
    this.api.listProductsInCartGet().subscribe(
      (info) => {
        console.log('data :', info);
        this.cartInfo = info;
        console.log(this.cartInfo);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  /**
   * here dialog box will open on delete product click
   * if user click remove then it will return true else false and from that basis it will slice the array of products
   * @param {number} i
   * @memberof CartComponent
   */
  openDialog(name:string,img:any,i:string) {
    let xyz: string = '';
    const dialogRef = this.dialog.open(DialogCartComponent, {
      width: '50vh',
      data: {
        name: name,
        img: img,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('result', result);
      this.time.starttimer();
      xyz = result;

      if (xyz == 'true') {
        if (this.quantity.length == 1) {
          console.log('length true');
          this.subTotal = 0;
        }

        this.api.cartProductDelete(i).subscribe(
          (info) => 
          {
            console.log('product quantity add success :', info);
                this.api.listProductsInCartGet().subscribe(
                  (info) => {
                    console.log('data :', info);
                    this.cartInfo = info;
                    console.log(this.cartInfo);
                  },
                  (error) => {
                    console.log(error.error.message);
                  });
          
          });
      }
    });
  }

  /**
   * if stock > 0 then it will add quantity by 1 to quantity array by id
   * @param {number} i of index number from array
   * @memberof CartComponent
   */
  onAddClick(quantity: number, i: string) {
    let data = {
      "quantity": quantity + 1,
    };

    this.api.updateCartQuantity(data, i).subscribe(
      (info) => {
        console.log('product quantity add success :', info);
        this.api.listProductsInCartGet().subscribe(
          (info) => {
            console.log('data :', info);
            this.cartInfo = info;
            console.log(this.cartInfo);
            // location.reload()
          },
          (error) => {
            console.log(error.error.message);
          }
        );
    
      },
      (error) => {
        console.log('product quantity add success :', error.error.message);
      } 
    );
  }

  /**
   * it will subtract quantity by 1 to quantity array by using id
   * @param {number} i of index number from array
   * @memberof CartComponent
   */
  onRemoveClick(quantity: number, i: string) {
    console.log(quantity);
    let data = {
      "quantity": quantity - 1,
    };

    this.api.updateCartQuantity(data, i).subscribe(
      (info) => {
        console.log('product quantity delete success :', info);
        this.api.listProductsInCartGet().subscribe(
          (info) => {
            console.log('data :', info);
            this.cartInfo = info;
            console.log(this.cartInfo);
          },
          (error) => {
            console.log(error.error.message);
          }
        );
    
      },
      (error) => {
        console.log('product quantity add success :', error.error.message);
      }
    );
  }
/**
 *  This Method shows a confirmation dialogue to the user to confirm delete or not 
 *
 * @param {string} name Name of the Product
 * @param {*} img Image of the product
 * @param {string} i Index Number
 * @memberof CartComponent
 */
onDeleteClick(name:string,img:any,i:string) {
    this.openDialog(name,img,i);
  }
}
