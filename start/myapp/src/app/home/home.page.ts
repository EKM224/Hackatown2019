import { GeoService } from './../geo.service';
import { PlacesAPIService } from './../PlacesAPI/places-api.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
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
  inRad = 1500;
  endroits: Lieu[];

  constructor(public mapsSerice: PlacesAPIService, public geoService: GeoService){
  }

  useMyLocation() {
    this.geoService.getLocation();
    this.inLat = this.geoService.lat;
    this.inLong = this.geoService.long;
  }

  loadPlaces() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    let places: Lieu[] = new Array();
    places = this.mapsSerice.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad);
    console.log(places);
    this.endroits = places;
    console.log(places.length);
    this.mapsSerice.getDirection(places[0].adresse, places[1].adresse);
  }

  annuler() {
      document.getElementById('result').style.display = 'none';
      document.getElementById('home').style.display = 'block';
  }
}
