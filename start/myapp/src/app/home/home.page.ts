import { PlacesAPIService } from './../PlacesAPI/places-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inLat: number;
  inLong: number;
  inType: string;
  inKey: string;
  inRad: number;

  constructor(public mapsSerice: PlacesAPIService){

  }
  loadPlaces(){
    let places = this.mapsSerice.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad)
    console.log(places);
  }

}
