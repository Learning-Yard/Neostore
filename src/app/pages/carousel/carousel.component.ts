import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/assets/services/api.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(private api:ApiService) { }

  public carouselImg:any

  ngOnInit(): void {
    this.api.listAllCategoryGet().subscribe(
      (info) => {
        this.carouselImg = info
        console.log("category:",info);
        
        console.log(this.carouselImg.data[0].image);
        
      });
    }
  
}