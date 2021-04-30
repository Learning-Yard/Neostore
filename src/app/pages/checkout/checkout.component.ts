import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/assets/services/api.service';
import { DialogCartComponent } from '../dialog-cart/dialog-cart.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppComponent } from '../../app.component';

export interface DialogData {
  name: string;
  img: any;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  @Input() quantity = Array();
  @Input() subTotal: number = 0;
  public x = 0;
  public cartInfo: any;
  public cartData = this.api.cartList();
  public addressId: string = "";
  // public price = this.cartData.product_details[0].product_cost;
  // public total = this.cartData.product_details[0].total_productCost;
  // public quantity = this.cartData.product_details[this.i].quantity;
  // public stock = this.cartData.product_details[0].product_id.product_stock;
  public address_list: any = [];
  name: any;
  animal: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  country: any;
  id: string = "";
  public addresses: any = [];

  constructor(private api: ApiService, public dialog: MatDialog, private ngxLoader: NgxUiLoaderService, private timer:AppComponent) { }

  ngOnInit() {
    // trying to share quantity to dataservice
    // this.api.setCartCount(this.cartData.product_details[0].quantity);
    console.log(this.quantity);
    console.log(this.quantity[1]);
    // this.reload()

    // setInterval('this.reload()', 5000)
    this.ngxLoader.start();
    this.api.listProductsInCartGet().subscribe(
      (info) => {
        console.log('data :', info);
        this.cartInfo = info;
        console.log(this.cartInfo);
        this.addressList();
        // location.reload()
        this.ngxLoader.stop();
      },
      (error) => {
        console.log(error.error.message);
      }
    );

    // adding quantities to quantoty Array
    // for (let j of this.cartData.product_details) {
    //   this.quantity[this.x] = j.quantity;
    //   this.x = this.x + 1;
    // }
    // console.log('x:', this.x);

    // here calculating subtotal of all product by taking index id of array from quantity array
    // and multiply with its respective product price and add them one by one from for loop
    // let j = this.quantity.length;
    // console.log('array length', this.quantity.length);
    // let subTotal1: number = 0;
    // for (let y = 0; y < j; y++) {
    //   subTotal1 =
    //     subTotal1 +
    //     this.quantity[y] * this.cartData.product_details[y].product_cost;
    //   this.subTotal = subTotal1;
    //   console.log('subtotal', this.subTotal);
    // }
  }

  /**
   * here dialog box will open on delete product click
   * if user click remove then it will return true else false and from that basis it will slice the array of products
   * @param {number} i
   * @memberof CartComponent
   */
  openDialog(name: string, img: any, i: string) {
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
      // this.abcd = result
      xyz = result;

      if (xyz == 'true') {
        if (this.quantity.length == 1) {
          console.log('length true');
          this.subTotal = 0;
        }
        this.ngxLoader.start();
        this.api.cartProductDelete(i).subscribe(
          (info) => {
            console.log('product quantity add success :', info);
            this.api.listProductsInCartGet().subscribe(
              (info) => {
                console.log('data :', info);
                this.cartInfo = info;
                console.log(this.cartInfo);
                // location.reload()
                this.ngxLoader.stop();
              },
              (error) => {
                console.log(error.error.message);
              });

          });
        // console.log('subtotal', this.subTotal);
        // console.log('product json', this.cartData.product_details);
      }
    });
  }

  /**
   * if stock > 0 then it will add quantity by 1 to quantity array by id
   * @param {number} i of index number from array
   * @memberof CartComponent
   */
  onAddClick(quantity: number, i: string) {
    // this.i = i;

    let data = {
      "quantity": quantity + 1,
    };
    this.ngxLoader.start();
    this.api.updateCartQuantity(data, i).subscribe(
      (info) => {
        console.log('product quantity add success :', info);
        // this.cartInfo = info
        // console.log(this.cartInfo);
        this.ngxLoader.start();
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
        this.ngxLoader.stop();
      },
      (error) => {
        console.log('product quantity add success :', error.error.message);
      }
    );


    // if (this.stock > 0) {
    //   this.quantity[i] = this.quantity[i] + 1;
    //   // this.quantity = this.quantity + 1;
    //   this.stock = this.stock - 1;
    //   console.log('array quantity from add method', this.quantity);

    //   let j = this.quantity.length;
    //   console.log('array length', this.quantity.length);
    //   let subTotal1: number = 0;
    //   for (let y = 0; y < j; y++) {
    //     subTotal1 =
    //       subTotal1 +
    //       this.quantity[y] * this.cartData.product_details[y].product_cost;
    //     this.subTotal = subTotal1;
    //     console.log('subtotal', this.subTotal);
    //   }
    // }
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
    this.ngxLoader.start();
    this.api.updateCartQuantity(data, i).subscribe(
      (info) => {
        console.log('product quantity delete success :', info);
        // this.cartInfo = info
        // console.log(this.cartInfo);
        this.api.listProductsInCartGet().subscribe(
          (info) => {
            console.log('data :', info);
            this.cartInfo = info;
            console.log(this.cartInfo);
            // location.reload()
            this.ngxLoader.stop();
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

    // if (quantity > 1) {
    //   console.log(
    //     'before   this.quantity[i] = this.quantity[i] - 1;',
    //     i,
    //     this.quantity[i]
    //   );
    //   this.quantity[i] = this.quantity[i] - 1;
    //   this.stock = this.stock + 1;

    //   let j = this.quantity.length;
    //   console.log('array length from upper remove', this.quantity.length);
    //   let subTotal1: number = 0;
    //   console.log('quantity array', this.quantity);
    //   for (let y = 0; y < j; y++) {
    //     console.log('p ', i, ':', this.quantity[i]);
    //     subTotal1 =
    //       subTotal1 +
    //       this.quantity[y] * this.cartData.product_details[y].product_cost;
    //     this.subTotal = subTotal1;
    //     console.log('subtotal', this.subTotal);
    //   }
    // }
    // // else{
    //   if(this.quantity.length == 1){
    //     console.log("length true");
    //     this.subTotal = 0
    //   }
    //   console.log("array length before splicing",this.quantity.length);
    //     console.log("quantity array before splicing",this.quantity);
    //   this.quantity.splice(i,1);
    //   console.log("array length after splicing",this.quantity.length);
    //     console.log("quantity array after splicing",this.quantity);
    //     this.cartData.product_details.splice(i, 1);
    //     console.log("product json",this.cartData.product_details);
    //     console.log("array length",this.quantity.length);
    //     console.log("quantity array",this.quantity);
    //   let j = this.quantity.length
    //   let subTotal1:number = 0
    //     for (let y = 0; y < j; y++) {
    //       subTotal1 = subTotal1 + (this.quantity[y] * this.cartData.product_details[y].product_cost);
    //       this.subTotal = subTotal1
    //       console.log('subtotal', this.subTotal);
    //     }
    //     console.log('subtotal', this.subTotal);
    // }
  }

  onDeleteClick(name: string, img: any, i: string) {
    this.openDialog(name, img, i);

    // if (this.abcd == "true") {

    //   if (this.quantity.length == 1) {
    //     console.log('length true');
    //     this.subTotal = 0;
    //   }
    //   console.log('array length before splicing', this.quantity.length);
    //   console.log('quantity array before splicing', this.quantity);
    //   this.quantity[i] = this.quantity[i];
    //   this.quantity.splice(i, 1);
    //   console.log('i inside delete click', i);
    //   console.log('array quantity', this.quantity);
    //   this.cartData.product_details.splice(i, 1);
    //   console.log('product json', this.cartData.product_details);

    //   // this.quantity = 0
    //   console.log('array length', this.quantity.length);
    //   let subTotal1: number = 0;
    //   let j = this.quantity.length;
    //   for (let y = 0; y < j; y++) {
    //     subTotal1 =
    //       subTotal1 +
    //       this.quantity[y] * this.cartData.product_details[y].product_cost;
    //     this.subTotal = subTotal1;
    //     console.log('subtotal', this.subTotal);
    //   }
    //   console.log('subtotal', this.subTotal);

    //   console.log('product json', this.cartData.product_details);
    // }
  }

  addressList() {
    this.ngxLoader.start();
    this.api.listAdress().subscribe((data) => {
      this.address_list = data;
      console.log(this.address_list.data.address);
      this.addresses = this.address_list.data.address;
    });
    this.ngxLoader.stop();
  }
  data(aid: string) {
    this.addressId = aid;
    console.log(this.addressId);
  }

  checkout() {
    console.log(this.addressId);
    let idd: any = {
      "addressId": this.addressId,
    }
    this.ngxLoader.start();
    this.api.checkout(idd).subscribe((data) => {
      console.log(data);
      alert("Order Placed Sucessfully");
      this.timer.starttimer();
      this.ngxLoader.stop();
    });
  }

}
