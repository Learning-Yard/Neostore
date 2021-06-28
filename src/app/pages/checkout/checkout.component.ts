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
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ProfileDataService } from '../../../assets/services/profile-data.service';
import { Router } from '@angular/router';


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
  strikeCheckout:any = null;
  supertoken=0;
  b:any;
  currentMessage = new BehaviorSubject<Object>(1);

  constructor(private api: ApiService, private service: ProfileDataService , public dialog: MatDialog, private ngxLoader: NgxUiLoaderService, private timer:AppComponent, private angularFireMessaging: AngularFireMessaging, private route:Router) {
    // this.getoken();
    this.requestPermission();
    this.receiveMessage();
  }

  ngOnInit() {
    console.log(this.quantity);
    console.log(this.quantity[1]);
    this.requestPermission();
    this.ngxLoader.start();
    this.api.listProductsInCartGet().subscribe(
      (info) => {
        console.log('data :', info);
        this.cartInfo = info;
        console.log(this.cartInfo);
        this.addressList();
        this.ngxLoader.stop();
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

ngOnChanges(){
  this.api.listProductsInCartGet().subscribe(
    (info) => {
      console.log('data :', info);
      this.cartInfo = info;
      console.log(this.cartInfo);
      this.addressList();
      this.ngxLoader.stop();
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
        this.ngxLoader.start();
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
        this.ngxLoader.stop();
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
    this.ngxLoader.start();
    this.api.updateCartQuantity(data, i).subscribe(
      (info) => {
        console.log('product quantity delete success :', info);
        this.api.listProductsInCartGet().subscribe(
          (info) => {
            console.log('data :', info);
            this.cartInfo = info;
            console.log(this.cartInfo);
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
  }
/**
 * Sends data to delete dialogue and asks confirmation
 *
 * @param {string} name Name of the product
 * @param {*} img Image of the product
 * @param {string} i index
 * @memberof CheckoutComponent
 */
onDeleteClick(name: string, img: any, i: string) {
    this.openDialog(name, img, i);
  }

/**
 * Checks and submits the address the user selects as delivery location
 *
 * @memberof CheckoutComponent
 */
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
/**
 * This function sends the data to the order moduleand order gets placed and the cart items is set to 0
 *
 * @memberof CheckoutComponent
 */
checkout(_amount: number) {
  console.log(_amount);
    console.log(this.addressId);
    let idd: any = {
      "addressId": this.addressId,
    }
    this.ngxLoader.start();
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51J5R3WSCxxNJs5mUBk4vCrwtOYnuLqFWiwQXeNEYUDz8rL1hrXHQhdEBdksaC73mQyFLCv5FUGXgNg6bgBndI64J00FK4PRBrz',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Payment Sucessfull');
        this.supertoken=stripeToken;
        console.log(this.supertoken);
      }
    });
    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: _amount * 100
    });
    this.timezone();
  }

  timezone(){
     this.b= setInterval(() => {
      this.placeit();
      this.abc();
    }, 40000);
  }

placeit(){
  let idd: any = {
    "addressId": this.addressId,
  }

  this.ngxLoader.stop();

  this.api.checkout(idd).subscribe((data) => {
    console.log(data);
    alert("Order Placed Sucessfully");
    this.timer.starttimer();
    this.ngxLoader.stop();
    this.ngOnChanges();
  });
}

  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51J5R3WSCxxNJs5mUBk4vCrwtOYnuLqFWiwQXeNEYUDz8rL1hrXHQhdEBdksaC73mQyFLCv5FUGXgNg6bgBndI64J00FK4PRBrz',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }

      window.document.body.appendChild(scr);
    }
  }

  // requestPermission() {
  //   this.afMessaging.requestPermission
  //     .pipe(mergeMapTo(this.afMessaging.tokenChanges))
  //     .subscribe(
  //       (token) => { console.log('Permission granted! Save to the server!', token); },
  //       (error) => { console.error(error); },
  //     );
  // }

  // geToken(){
  //   this.afMessaging.getToken.subscribe(res=>console.log("Token",res))
  // }

  // showCustomNotification(payload:any){
  //   let notify_data = payload['notification'];
  //   let title = notify_data['title'];
  //   let options = {
  //     body:notify_data['body'],
  //     icon:"../assets/image/Angular_full_color_logo.svg.png",
  //     badge:"../assets/image/Angular_full_color_logo.svg.png",
  //     image:"../assets/image/Angular_full_color_logo.svg.png",
  //   }

  //   console.log("new message received", notify_data);
  //   let notify: Notification = new Notification(title,options)

  //   notify.onclick = event =>{
  //     event.preventDefault();
  //     window.location.href = "https://www.google.com"
  //   }

  // }

  // receiveMessage() {
  //   this.afMessaging.messages.subscribe((payload) => {
  //     console.log('new message received. ', payload);
  //     this.currentMessage.next(payload);
  //     this.showCustomNotification(payload)
  //   });
  // }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.api.fireStoreToken = token

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
      this.showCustomNotification(payload)
    });
  }


  showCustomNotification(payload:any){
    let notify_data = payload['notification'];
    let title = notify_data['title'];
    let options = {
      body:notify_data['body'],
      icon:"../assets/images/n.png",
      badge:"../assets/images/n.png",
      image:"../assets/images/n.png",
    }

    console.log("new message received", notify_data);
    let notify: Notification = new Notification(title,options)

    notify.onclick = event =>{
      event.preventDefault();
      this.service.isProfile = false;
      this.service.isChangePassword = false;
      this.service.isAddress = false;
      this.service.isOrder = true;
      window.location.href = "http://localhost:4200/my-account";
      this.route.navigate(['/my-account']);

    }

  }

  abc(){
    console.log("abc token:", this.api.fireStoreToken);

    let data1 = {
      "notification": {
      "title": "Order PLaced Successfully",
      "body": "Click for order details",
      "icon":"../assets/images/n.png",
     "click_action" : "http://localhost:4200/my-account"
      },
         "to":this.api.fireStoreToken
      };
    this.api.pushNotification(data1).subscribe((data) => {
      console.log("notification content:",data);

    })
  }

}
