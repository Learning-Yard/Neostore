import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../../../assets/services/order-details.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public order_list:any =[]; 

  constructor(private service:OrderDetailsService) { }

  ngOnInit():void{
    this.recievedata()
  }

recievedata(){
  this.order_list = this.service.sendata();
  console.log(this.order_list);
}

}
