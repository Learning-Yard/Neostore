import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {MatTabsModule} from '@angular/material/tabs';
// import { CartComponent } from '../cart/cart.component';
import ProductDataList from '../../../assets/data/dummy_product_list.json';
import { CartFunctionsService } from '../../../assets/services/cart-functions.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  /**
   * This Contains all the data fields that our dummy JSON has
   *
   * @type {{
   *     success: boolean; status_code: number; message: string;
   *     product_details: {
   *       _id: string; subImages_id: { product_subImages: string[]; _id: string; subImages_id: string; __v: number; };
   *       category_id: { _id: string, category_name: string, product_image: string, created_at: string, __v: number };
   *       Color_id: { _id: string, color_name: string, color_code: string, color_id: string, __v: number }; product_id: string, product_name: string, product_desc: string, product_rating: string, product_producer: string, product_cost: number, product_stock: number, product_dimension: any, product_material: string, createdAt: string, __v: number;
   *     }[]; total_count: number;
   *   }[]}
   * @memberof ProductComponent
   */
  public dummyList: {
    success: boolean; status_code: number; message: string;
    product_details: {
      _id: string; subImages_id: { product_subImages: string[]; _id: string; subImages_id: string; __v: number; };
      category_id: { _id: string, category_name: string, product_image: string, created_at: string, __v: number };
      Color_id: { _id: string, color_name: string, color_code: string, color_id: string, __v: number }; product_id: string, product_name: string, product_desc: string, product_rating: string, product_producer: string, product_cost: number, product_stock: number, product_dimension: any, product_material: string, createdAt: string, __v: number;
    }[]; total_count: number;
  }[] = ProductDataList;

  id: any; // ID
  big_image: any;  // Big size Image
  // imgSrc:any;
  product_name: string = ""; // Product Name
  product_cost: number = 0; // Product Cost
  color_name: string = "";  // Product Cost
  color_hex: string = ""; // Color string
  small_images = []; // Small images array
  product_desc: string = ""; // Product Description
  dimension: any; // Dimensions of the item
  product_material: string = ""; // Product Material
  
  
  constructor(private router: ActivatedRoute, private service: CartFunctionsService) { }
/**
 * Here we have took the product id of the product from card layout of dashboard of item we selected
 * and we took only those parameters needed to be displayed on the product detail page  
 *
 * @return {*} 
 * @memberof ProductComponent
 */
ngOnInit() {
    // console.log(this.router.snapshot.params);
    this.id = this.router.snapshot.params['_id'];
    if (this.dummyList[0].product_details[0].category_id._id == this.id) {
      console.log(this.dummyList[0].product_details[0].category_id)
      this.big_image = this.dummyList[0].product_details[0].category_id.product_image;
      this.product_name = this.dummyList[0].product_details[0].product_name;
      this.product_cost = this.dummyList[0].product_details[0].product_cost;
      this.color_name = this.dummyList[0].product_details[0].Color_id.color_name;
      this.color_hex = this.dummyList[0].product_details[0].Color_id.color_code;
      this.product_desc = this.dummyList[0].product_details[0].product_desc;
      this.dimension = this.dummyList[0].product_details[0].product_dimension;
      this.product_material = this.dummyList[0].product_details[0].product_material;
      // this.imgSrc = this.dummyList[0].product_details[0].category_id.product_image;
      // console.log(this.imgSrc)
      // this.service.cardmodulereciever(this.dummyList,{})
    } else {
      console.log("Product doesnt exist")
    }
    return null
  }
  
}
