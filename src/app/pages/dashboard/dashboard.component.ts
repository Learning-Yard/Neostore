import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CardsComponent } from '../cards/cards.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { AuthcheckService } from '../../../assets/services/authcheck.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
user = localStorage.getItem("name");
  constructor(private service:AuthcheckService) { }
  
  ngOnInit(): void {
    console.log(this.user);
  }
signout(){
  this.service.signOut();
  this.user="";
}
}
