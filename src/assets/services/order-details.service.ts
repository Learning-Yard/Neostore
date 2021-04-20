import { Injectable } from '@angular/core';
import  Orders  from '../data/dummy_order_list.json';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  public order_list:{
    success: boolean,
    status_code: number,
    message: string,
    product_details:
    {
      _id: string,
      product_details:
      {
        _id: string,
        total_cartCost: string,
        isDelivered: boolean,
        customer_id: number,
        order_id: string,
        product_id: string,
        quantity: number,
        delivery_address: string,
        total_productCost: string,
        createdAt: string,
        __v: number,
        product_details: 
         {
          _id: string,
          subImages_id: string,
          category_id: string,
          color_id: string,
          product_id: string,
          product_name: string,
          product_image: string,
                    product_desc: string,
          product_rating: any,
          product_producer: string,
          product_cost: number,
          product_stock: number,
          product_dimension: string,
          product_material: string,
          createdAt: string,
          __v: number,
        } []
      } []
    }[]
  }
  = Orders;
  constructor() { }
  public Filterarray=this.order_list.product_details;
  sendata(){
    return this.Filterarray;
  }
}
