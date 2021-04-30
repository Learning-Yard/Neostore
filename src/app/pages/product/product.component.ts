import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {MatTabsModule} from '@angular/material/tabs';
// import { CartComponent } from '../cart/cart.component';
import ProductDataList from '../../../assets/data/dummy_product_list.json';
import { ApiService } from '../../../assets/services/api.service';
import { CartFunctionsService } from '../../../assets/services/cart-functions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedZoomModule } from 'ngx-red-zoom';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
  // public productList: any;
  // public category1 = Array();
  // public category = Array();
  // public categoryColor1 = Array();
  // public categoryColor = Array();
  public productInfo:any={}
  public productDetail:any ={}
  public avgRating:number=0
  public src:any
  public mainImage:any
  checkBoxInstance: any;
  public snackMsg:string="";
  public _id = this.router.snapshot.params['_id'];
  public mainUrl = "http://localhost:4200/product/";
  public fullUrl="";

  constructor(private router: ActivatedRoute, private service: CartFunctionsService , private api:ApiService , private _snackBar: MatSnackBar , private ngxLoader: NgxUiLoaderService) { }
/**
 * Here we have took the product id of the product from card layout of dashboard of item we selected
 * and we took only those parameters needed to be displayed on the product detail page  
 *
 * @return {*} 
 * @memberof ProductComponent
 */
ngOnInit() {
  this.ngxLoader.start();
  this.api.getProductList().subscribe((info) => {
    console.log(info);
    this.productInfo = info;
  console.log("productInfo: ",this.productInfo);
  for(let i of this.productInfo.data.docs){
    if(this._id == i.id){
      this.productDetail = i
      this.mainImage = this.productDetail.mainImage
      console.log("p:", this.productDetail);
      this.avgRating = i.avgRating
    }
  }
  });
 this.fullUrl = this.mainUrl + this._id;
 this.ngxLoader.stop(); 
}

addToCart(productId: string) {
  let data = {
    productId: productId,
    quantity: 1,
  };
  console.log('productId', productId);
  this.ngxLoader.start();
  this.api.addProductsInCartPost(data).subscribe(
    (info) => {
      console.log('data :', info);
      this.snackMsg = "Product Added"
      this.ngxLoader.stop();
      this.openSnackBar()
    },
    (error) => {
      let msg;
      msg = error;
      this.snackMsg = error.error.message
      this.openSnackBarError()
      console.log(error.error.message);
    }
  );
}
  // console.log(this.router.snapshot.params);
    // this.id = this.router.snapshot.params['_id'];
    // if (this.dummyList[0].product_details[0].category_id._id == this.id) {
    //   console.log(this.dummyList[0].product_details[0].category_id)
    //   this.big_image = this.dummyList[0].product_details[0].category_id.product_image;
    //   this.product_name = this.dummyList[0].product_details[0].product_name;
    //   this.product_cost = this.dummyList[0].product_details[0].product_cost;
    //   this.color_name = this.dummyList[0].product_details[0].Color_id.color_name;
    //   this.color_hex = this.dummyList[0].product_details[0].Color_id.color_code;
    //   this.product_desc = this.dummyList[0].product_details[0].product_desc;
    //   this.dimension = this.dummyList[0].product_details[0].product_dimension;
    //   this.product_material = this.dummyList[0].product_details[0].product_material;
      // this.imgSrc = this.dummyList[0].product_details[0].category_id.product_image;
      // console.log(this.imgSrc)
      // this.service.cardmodulereciever(this.dummyList,{})
  //   } else {
  //     console.log("Product doesnt exist")
  //   }
  //   return null
  // }
//   this.api.getProductList().subscribe((info) => {
//     this.productList = info;
//     for (let i = 0; i < info.data.docs.length; i++) {
//       // getting color from product lists
//       this.categoryColor1.push(this.productList.data.docs[i].color.name);

//       // getting category from product lists
//       this.category1.push(this.productList.data.docs[i].category.name);
//     }

//     // taking distinct color from array
//     this.categoryColor = this.categoryColor1.filter(
//       (value, index, categoryArray) => categoryArray.indexOf(value) === index
//     );

//     // taking distinct element from array
//     this.category = this.category1.filter(
//       (value, index, categoryArray) => categoryArray.indexOf(value) === index
//     );

//     console.log(this.category);
//     console.log(this.categoryColor);
//     console.log(this.productList.data.docs);
//   });
// } 


openSnackBar() {
  this._snackBar.open(this.snackMsg, 'x', {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 5000,
    panelClass:['greenYesMatch']

  });
}

openSnackBarError() {
  this._snackBar.open(this.snackMsg, 'x', {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 5000,
    panelClass:['redNoMatch']
      });
}

onMainImgClick(){
  this.mainImage = this.productDetail.mainImage
}

onImgClick(id:any){
  // for(let i=0; i< this.productDetail.data.docs.subImages; i++){
    let j=0
    for(let i of this.productDetail.subImages){
    if(j== id){
      this.src = i
      console.log(this.src);
      this.mainImage = i
      break
    }
    j++
  }
  // this.src = id
  // console.log(id);
  
}

}
