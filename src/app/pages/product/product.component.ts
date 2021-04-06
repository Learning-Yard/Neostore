import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {MatTabsModule} from '@angular/material/tabs';
import ProductDataList from '../../../assets/data/dummy_product_list.json';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  p_category_id="";
  public dummyList:{success: boolean; status_code: number; message: string; 
    product_details: { _id: string; subImages_id: { product_subImages: string[]; _id: string; subImages_id: string; __v: number; }; 
    category_id: { _id:string , category_name:string , product_image:string , created_at:string , __v:number}; 
    Color_id :{_id:string , color_name:string , color_code:string , color_id:string , __v:number}; product_id:string , product_name:string , product_desc:string , product_rating:string , product_producer:string , product_cost:number , product_stock:number , product_dimension:any , product_material:string , createdAt:string , __v: number; }[]; total_count: number; }[]=ProductDataList;
  
    id: any;
    big_image:any;
    product_name:string="";
    product_cost:number=0;
    color_name:string="";
    color_hex:string="";
    small_images=[];
    product_desc:string="";
    dimension:any;
    product_material:string="";

  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.router.snapshot.params);
    this.id=this.router.snapshot.params['_id'];
    if (this.dummyList[0].product_details[0].category_id._id == this.id ){
    console.log(this.dummyList[0].product_details[0].category_id)
    this.big_image = this.dummyList[0].product_details[0].category_id.product_image;
    this.product_name = this.dummyList[0].product_details[0].product_name;
    this.product_cost = this.dummyList[0].product_details[0].product_cost;
    this.color_name = this.dummyList[0].product_details[0].Color_id.color_name;
    this.color_hex = this.dummyList[0].product_details[0].Color_id.color_code;
    this.product_desc = this.dummyList[0].product_details[0].product_desc;
    this.dimension = this.dummyList[0].product_details[0].product_dimension;
    this.product_material = this.dummyList[0].product_details[0].product_material;
    }else{
      console.log("Product doesnt exist")
    }
  }

}
