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
  
  public cartCount: number | undefined;
  constructor() { }

  getCartData() {
    return this.cartList;
  }

  setCartCount(count: number) {
    console.log(this.cartCount);
    this.cartCount = count;
  }

  getCartCount(){
    return this.cartCount
  }

}