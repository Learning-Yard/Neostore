import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../src/app/pages/footer/footer.component';
import { AuthcheckService } from '../../src/assets/services/authcheck.service';
import { RouterModule , Router } from '@angular/router';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neo-store';
  public token = this.api.token_it;
  user = localStorage.getItem("name");
  username =     JSON.parse(localStorage.getItem("user")+"");
  cartValue: any;
  b:any;
  constructor(private service: AuthcheckService , private router:Router , private api:ApiService) { }

  ngOnInit(): void {
    this.api.listProductsInCartGet().subscribe((info) => {
      this.api.cartValue = info.data.products.length;
      // this.cartValue = this.data.cartValues
      this.cartValue! = info.data.products.length;
      console.log(this.cartValue);
      this.starttimer();
      console.log(this?.token);
  });

  if (!this?.token) {
    console.log('token is unavailable');
    // clearInterval(this.b);
    this.pauseTimeLine();
  }else{
    this.pauseTimeLine();
  }
}
pauseTimeLine() {
  clearInterval(this.b);
  console.log('stopeed');
}

starttimer(){
  this.b = setInterval(() => {
    this.initData();
  }, 1000);
}
  initData() {
    this.api.listProductsInCartGet().subscribe((info) => {
      this.api.cartValue = info.data.products.length;
      // this.cartValue = this.data.cartValues
      this.cartValue! = info.data.products.length;
      console.log(this.cartValue);
      this.pauseTimeLine();
      // this.token = localStorage.getItem('token')
      // console.log("this.token",this.token);
    });
  }
  gotocart(){
    this.router.navigate(['/cart']);
  }

  /**
   *
   *
   * @memberof DashboardComponent
   */
  signout() {
    this.service.signOut();
    this.user = "";
    location.reload();
  }

}

