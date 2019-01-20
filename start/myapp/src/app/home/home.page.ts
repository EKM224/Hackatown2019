import { PlacesAPIService } from './../PlacesAPI/places-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inLat: number = 45.502990;
  inLong: number = -73.613990;
  inType: string = "restaurant";
  inKey: string;
  inRad: number = 1500;

  constructor(public mapsSerice: PlacesAPIService){

  }
  loadPlaces(){
    let places = this.mapsSerice.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad)
    console.log(places);
  }

}
