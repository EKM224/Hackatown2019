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
  inLat: number; // = 45.502990;
  inLong: number; // = -73.613990;
  inType = 'restaurant';
  inKey: string;
  inRad = 2500;

  constructor(public mapsSerice: PlacesAPIService, public geoService: GeoService) {

  }

  getAddr() {
    this.mapsSerice.getAddr(this.inLat, this.inLong);
  }

  useMyLocation() {
    this.geoService.getLocation();
    this.inLat = this.geoService.lat;
    this.inLong = this.geoService.long;
  }

  async loadPlaces() {
    const places: Lieu[] = await this.mapsSerice.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad);
    // this.mapsSerice.getDirection(places[0].adresse, places[1].adresse, 'WALKING');
  }
}
