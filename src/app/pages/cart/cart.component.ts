import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CartFunctionsService } from '../../../assets/services/cart-functions.service';
import { ApiService } from '../../../assets/services/api.service';
// import {} from '../../../assets/services/data.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit{
  // public i: number = 0;
  @Input() quantity = Array();
  @Input() subTotal: number = 0;
  public x = 0;
  public cartData = this.data.getCartData();
  public price = this.cartData.product_details[0].product_cost;
  public total = this.cartData.product_details[0].total_productCost;
  // public quantity = this.cartData.product_details[this.i].quantity;
  public stock = this.cartData.product_details[0].product_id.product_stock;
  public productList:any;
  public token:any;
  constructor(private data: CartFunctionsService , private api:ApiService) { }
  total2: number | undefined;
  ngOnInit() {
    // // trying to share quantity to CartFunctionsService
    // this.data.setCartCount(this.cartData.product_details[0].quantity);
    // console.log(this.quantity);
    // console.log(this.quantity[1]);
    let user:any = (localStorage.getItem("user"));
    let user2:any = JSON.parse(user);
    this.token=user2.token;
    this.api.cartList(user2.token).subscribe((info) => {
      this.productList= info;
      console.log(this.productList.data.products);
      this.operations()
    });
    
  }
  operations(){
        // adding quantities to quantoty Array
        for (let j of this.productList.data.products) {
          // this.quantity[this.x] = j.quantity;
          // this.x = this.x + 1;
          // console.log(j);

          let data = {quantity:j.quantity}
          this.api.updateCartQuantity(j._id,data).subscribe((data)=>{
            console.log(data);
          });
        }    
        let j = this.quantity.length
            console.log("array length",this.quantity.length);
            let subTotal1:number = 0
            for (let y = 0; y < j; y++) {
              subTotal1 = subTotal1 + (this.quantity[y] * this.cartData.product_details[y].product_cost);
              this.subTotal = subTotal1
              console.log('subtotal', this.subTotal);
            }
      }
    
      onAddClick(i: number) {
        // this.i = i;
        if (this.stock > 0) {
          this.quantity[i] = this.quantity[i] + 1;
          // this.quantity = this.quantity + 1;
          this.stock = this.stock - 1;
        console.log("array quantity from add method",this.quantity);
         
          let j = this.quantity.length
            console.log("array length",this.quantity.length);
            let subTotal1:number = 0
            for (let y = 0; y < j; y++) {
              subTotal1 = subTotal1 + (this.quantity[y] * this.cartData.product_details[y].product_cost);
              this.subTotal = subTotal1
              console.log('subtotal', this.subTotal);
            }
        }
      }
    
      onRemoveClick(i: number) {
        // this.i = i;
        // public quantity = this.cartData.product_details[0].quantity;
        // this.quantity[i]= this.cartData.product_details[this.i].quantity;
        if (this.quantity[i] > 1) {
          console.log('before   this.quantity[i] = this.quantity[i] - 1;',i,this.quantity[i]);
          this.quantity[i] = this.quantity[i] - 1;
          this.stock = this.stock + 1;
         
            let j = this.quantity.length
            console.log("array length from upper remove",this.quantity.length);
            let subTotal1:number = 0
            console.log("quantity array",this.quantity);
              for (let y = 0; y < j; y++) {
              console.log("p ",i,":",this.quantity[i]);
              subTotal1 = subTotal1 + (this.quantity[y] * this.cartData.product_details[y].product_cost);
              this.subTotal = subTotal1
              console.log('subtotal', this.subTotal);
            }   
        } else{
          if(this.quantity.length == 1){
            console.log("length true");
            this.subTotal = 0 
          }
          console.log("array length before splicing",this.quantity.length);
            console.log("quantity array before splicing",this.quantity);
          this.quantity.splice(i,1);
          console.log("array length after splicing",this.quantity.length);
            console.log("quantity array after splicing",this.quantity);
            this.cartData.product_details.splice(i, 1);
            console.log("product json",this.cartData.product_details);
            console.log("array length",this.quantity.length);
            console.log("quantity array",this.quantity);
          let j = this.quantity.length
          let subTotal1:number = 0
            for (let y = 0; y < j; y++) {
              subTotal1 = subTotal1 + (this.quantity[y] * this.cartData.product_details[y].product_cost);
              this.subTotal = subTotal1
              console.log('subtotal', this.subTotal);
            }
            console.log('subtotal', this.subTotal);
        }
      }
    
      onDeleteClick(i: number) {
        if(this.quantity.length == 1){
          console.log("length true");
          this.subTotal = 0
          
        }
        console.log("array length before splicing",this.quantity.length);
        console.log("quantity array before splicing",this.quantity);
        this.quantity[i] = this.quantity[i] 
        this.quantity.splice(i,1)
        console.log("i inside delete click",i);
        console.log("array quantity",this.quantity);
        this.cartData.product_details.splice(i, 1);
        console.log("product json",this.cartData.product_details);
    
        // this.quantity = 0
        console.log("array length",this.quantity.length);
        let subTotal1:number = 0
        let j = this.quantity.length
        for (let y = 0; y < j; y++) {
          subTotal1 = subTotal1 + (this.quantity[y] * this.cartData.product_details[y].product_cost);
          this.subTotal = subTotal1
          console.log('subtotal', this.subTotal);
        }
        console.log('subtotal', this.subTotal);
    
        console.log("product json",this.cartData.product_details);
        
      }
  }
