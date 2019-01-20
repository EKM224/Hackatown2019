import { GeoService } from './../geo.service';
import { PlacesAPIService } from './../PlacesAPI/places-api.service';
import { Component } from '@angular/core';
import { Lieu } from '../Lieu';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inLat: number; //= 45.502990;
  inLong: number; // = -73.613990;
  inType: string = "restaurant";
  inKey: string;
  inRad: number = 1500;

  constructor(public mapsSerice: PlacesAPIService, public geoService: GeoService){

  }

  useMyLocation(){
    this.geoService.getLocation();
    this.inLat = this.geoService.lat;
    this.inLong = this.geoService.long;
  }

  loadPlaces(){
    let places: Lieu[] = new Array();
    places = this.mapsSerice.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad);
    console.log(places);
    this.mapsSerice.getDirection("6025, Boul. De La, Chemin de la Côte-des-Neiges, Montréal"
      , "5400 Chemin de la Côte-des-Neiges, Montréal");
  }
}
