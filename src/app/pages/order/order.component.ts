import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../../../assets/services/order-details.service';
import { ApiService } from '../../../assets/services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public order_list:any =[];
  public order_listing:any =[];

  constructor(private service:OrderDetailsService , private api:ApiService) { }

  ngOnInit():void{
    this.recievedata()
  }

recievedata(){
  this.api.orderList().subscribe((data)=>{
    this.order_list = data;
    this.order_listing = this.order_list.data.orders[0].items;
    console.log(this.order_listing);
  });
}

}
