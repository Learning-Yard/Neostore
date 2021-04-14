import { Component, OnChanges, OnInit } from '@angular/core';
// import CartData from '../../../assets/data/dummy_cart.json'
import { CartFunctionsService } from '../../../assets/services/cart-functions.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnChanges {
  product_details = [];
  id = "";
  constructor(private service: CartFunctionsService) { }

  ngOnInit() {
    this.id = this.service.id;
    console.log(this.id);
    this.recieveobject()
  }
// id of the item we clicked add button on
// id is redirected to addnoofitem function in service
  addno_of_Item(id: string) {
    this.service.addno_of_Item(id);
    this.recieveobject()
    // this.recieveobject()
  }

  removeno_of_Item(id: string) {
    this.service.removeno_of_Item(id);
    this.recieveobject()
    // this.recieveobject()
  }

  ngOnChanges(){
    // this.recieveobject()
    console.log("Onchange called")
  }
  // recieves updated data from service for display 
  recieveobject() {
    this.product_details = this.service.senddata()
    console.log(this.product_details);
  }

  //   public deleteItem(_id: any) {
  //     this.Filterarray.splice(_id-1, 1);
  //     console.log(_id);
  // }

  // let title = this.Filterarray[_id-1].title;
  // let result = prompt("Edit Task Title", title);
  // if (result !== null && result !== ""){
  //   this.Filterarray[_id-1].title = result;
}