import { Injectable } from '@angular/core';
import CartData from '../../assets/data/dummy_cart.json';

@Injectable({
  providedIn: 'root'
})
export class CartFunctionsService {
/**
 * This contains the fields that Our dummy json has
 *
 * @type {{
 *     success: boolean; success code
 *     status_code: number; status code
 *     message: string; message
 *     product_details: product detail object
 *     {
 *       _id: string;
 *       customer_id: number;
 *       product_id: {
 *         _id: string;
 *         subImages_id: string;
 *         Category_id: {
 *           _id: string;
 *           category_name: string;
 *           category_id: string;
 *           product_image: string;
 *           created_at: string;
 *           __v: number
 *         };
 *         Color_id: {
 *           _id: string;
 *           color_name: string;
 *           color_code: string;
 *           color_id: string;
 *           __v: number
 *         };
 *         product_id: string;
 *         product_name: string;
 *         product_image: string;
 *         product_desc: string;
 *         product_rating: string;
 *         product_producer: string;
 *         product_cost: number;
 *         product_stock: number;
 *         product_dimension: string;
 *         product_material: string;
 *         createdAt: string;
 *         __v: number
 *       };
 *       quantity: number;
 *       product_cost: number;
 *       total_productCost: number;
 *       createdAt: string;
 *       __v: number
 *     }[]
 *
 *   }}
 * @memberof CartFunctionsService
 */
public cartList: {
    success: boolean;
    status_code: number;
    message: string;
    product_details:
    {
      _id: string;
      customer_id: number;
      product_id: {
        _id: string;
        subImages_id: string;
        Category_id: {
          _id: string;
          category_name: string;
          category_id: string;
          product_image: string;
          created_at: string;
          __v: number
        };
        Color_id: {
          _id: string;
          color_name: string;
          color_code: string;
          color_id: string;
          __v: number
        };
        product_id: string;
        product_name: string;
        product_image: string;
        product_desc: string;
        product_rating: string;
        product_producer: string;
        product_cost: number;
        product_stock: number;
        product_dimension: string;
        product_material: string;
        createdAt: string;
        __v: number
      };
      quantity: number;
      product_cost: number;
      total_productCost: number;
      createdAt: string;
      __v: number
    }[]

  } = CartData;
  public product: any = {};
  public product_update: any = {};
  public CartDataId: any
  public id: string = "5d0b1f354594d26e47774b5e";
  public DataId: any;

  constructor() { }
/**
 * Stock Status Boolean used to display Yes/or no in stock availability in cart 
 *
 * @private
 * @type {(boolean | undefined)}
 * @memberof CartFunctionsService
 */
private stock_status: boolean | undefined;
/**
 *  This is responsible to send data to cart component which gets displayed on cart page
 *  Updation also happens here
 * 
 * @return {*} 
 * @memberof CartFunctionsService
 */
senddata() {
    if (this.cartList.product_details[0].product_id.product_stock > 0) {
      this.stock_status = true;
    } else {
      this.stock_status = false;
    }
    this.product_update = [{ name: this.cartList.product_details[0].product_id.product_name, producer: this.cartList.product_details[0].product_id.product_producer, stock_available: this.stock_status, product_cost: this.cartList.product_details[0].product_id.product_cost, total_cost: this.cartList.product_details[0].total_productCost, product_image: this.cartList.product_details[0].product_id.product_image , quantity: this.cartList.product_details[0].quantity }];
    return this.product_update;
  }
/**
 *  The add no ofitem calculates total cost quantity of the items
 *
 * @param {string} _id Product id we click
 * @memberof CartFunctionsService
 */
addno_of_Item(_id: string) {
    if (this.cartList.product_details[0].product_id.product_id == _id) {
      if (this.cartList.product_details[0].product_id.product_stock > 0) {
        this.stock_status = true;
        this.cartList.product_details[0].product_id.product_stock = this.cartList.product_details[0].product_id.product_stock - 1;
        this.cartList.product_details[0].quantity = this.cartList.product_details[0].quantity + 1;
        this.cartList.product_details[0].total_productCost = (this.cartList.product_details[0].quantity * this.cartList.product_details[0].product_id.product_cost);
        this.product_update = this.product;
        this.senddata();
      } else {
        this.stock_status = false;
      }
      // this.product = [this.cartList.product_details[0].product_id.product_name,this.cartList.product_details[0].product_id.product_producer,this.stock_status,this.cartList.product_details[0].product_id.product_cost , this.cartList.product_details[0].total_productCost , this.cartList.product_details[0].product_id.product_image];
      this.product = [{ name: this.cartList.product_details[0].product_id.product_name, producer: this.cartList.product_details[0].product_id.product_producer, stock_available: this.stock_status, product_cost: this.cartList.product_details[0].product_id.product_cost, total_cost: this.cartList.product_details[0].total_productCost, product_image: this.cartList.product_details[0].product_id.product_image , quantity:this.cartList.product_details[0].quantity }];
      this.product_update = this.product;
      this.senddata();
      console.log(this.product);
      console.log(this.cartList.product_details[0].product_id.product_stock);
      // console.log(this.cartList);
    }
    else {
      console.log("No such product");
    }

  }

  removeno_of_Item(_id:string){
    this.cartList.product_details[0].product_id.product_stock = this.cartList.product_details[0].product_id.product_stock + 1;
    if(this.cartList.product_details[0].quantity===0){
      this.product = [];
      console.log(this.product)
      this.product_update = this.product;
      console.log(this.product_update)
      this.senddata();
    }else{
    this.cartList.product_details[0].quantity = this.cartList.product_details[0].quantity - 1;
  }
    this.cartList.product_details[0].total_productCost = (this.cartList.product_details[0].quantity * this.cartList.product_details[0].product_id.product_cost);
    this.product_update = this.product;
    console.log(this.product);
    this.senddata();
  }

  // cardmodulereciever(_items: { success: boolean; status_code: number; message: string; product_details: { _id: string; subImages_id: { product_subImages: string[]; _id: string; subImages_id: string; __v: number; }; category_id: { _id: string; category_name: string; product_image: string; created_at: string; __v: number; }; Color_id: { _id: string; color_name: string; color_code: string; color_id: string; __v: number; }; product_id: string; product_name: string; product_desc: string; product_rating: string; product_producer: string; product_cost: number; product_stock: number; product_dimension: any; product_material: string; createdAt: string; __v: number; }[]; total_count: number; }[],{}:any){
  //   console.log(_items)
  // }
}
