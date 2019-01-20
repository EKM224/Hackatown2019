import { GeoService } from './../geo.service';
import { PlacesAPIService } from './../PlacesAPI/places-api.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Lieu } from '../Lieu';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('home') home: ElementRef;
  @ViewChild('result') result: ElementRef;
  inLat: number; // = 45.502990;
  inLong: number; // = -73.613990;
  inType = 'restaurant';
  inKey: string;
  inRad = 2500;
  addr: string;
  endroits: Lieu[];
  first = true;

  constructor(public mapsService: PlacesAPIService, public geoService: GeoService) {
    this.useMyLocation();
  }

  async getAddr() {
    const ser = await this.mapsService.getDistanceLatLongNumber({lat: 48.862725, long: 2.287592},
       {lat: 48.8039, long: 2.287592}, 'WALKING');
    console.log(ser);
  }

  useMyLocation() {
    this.geoService.getLocation();
    this.inLat = this.geoService.lat;
    this.inLong = this.geoService.long;
    console.log(this.inLat);
    console.log(this.inLong);
    if (!this.first) {
      this.addr = this.mapsService.getAddr(this.inLat, this.inLong);
    }
    this.first = false;
  }

  async loadPlaces() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    const places: Lieu[] = await this.mapsService.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad);
  }

  annuler() {
      document.getElementById('result').style.display = 'none';
      document.getElementById('home').style.display = 'block';
  }
}
