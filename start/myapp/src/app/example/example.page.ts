import { Component, OnInit } from '@angular/core';
import { PlacesAPIService } from '../PlacesAPI/places-api.service';


@Component({
  selector: 'app-example',
  templateUrl: './example.page.html',
  styleUrls: ['./example.page.scss'],
})
export class ExamplePage implements OnInit {

  public hero: string;

  constructor(private placesAPI: PlacesAPIService) {
    this.hero = 'eg';
  }

  ngOnInit() {
    //this.hero = this.placesAPI.getPlaces(45.502990, -73.613990, "restaurant", "", 100);
  //  this.placesAPI.getPlaces().subscribe(data => {
  //      console.log(data);
  //      this.hero = data;
  //    });
  }

}
