import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CardsComponent } from '../cards/cards.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
