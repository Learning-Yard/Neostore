import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CardsComponent } from '../cards/cards.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { AuthcheckService } from '../../../assets/services/authcheck.service';
import { RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = localStorage.getItem("name");
  constructor(private service: AuthcheckService , private router:Router) { }

  ngOnInit(): void {
    console.log(this.user);
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
  }
}
