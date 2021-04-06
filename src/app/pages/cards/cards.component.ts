import { Component, OnInit } from '@angular/core';
import UserData from '../../../assets/data/dummy_dashboard.json';
import { RouterModule , Router } from '@angular/router';
// import {ProductComponent} from '../product/product.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public products:{_id:string,category_name:string,product_image:string,category_id:string,created_at:string,__v:number}[]=UserData;
  constructor(private routes: Router) { }
  
  ngOnInit(): void {
    
  }

  passdata(_id:string){
    console.log(_id);
    this.routes.navigate(['/product/'+_id]);
  }

}
