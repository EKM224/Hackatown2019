import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lieu } from '../Lieu'
declare const require: any;
declare var google;

@Injectable({
  providedIn: 'root'
})
export class PlacesAPIService {
  private placesUrl: string;
  private googleAPIKey: string;
  private map: any;

  constructor(private http: HttpClient) {
    this.map = new google.maps.Map(document.getElementById('map'));
    this.googleAPIKey = 'AIzaSyCqS8bXAYAOrObOu6-eWUE0mCsw0tKBKMY';
  }

  init(lat: number, long: number, type: string, keyword: string, radius: number){
    this.placesUrl = `https://maps.googleapis.com/maps/api/place/` +
    "nearbysearch/json?location=" + lat + "," + long + "&radius=" + radius + "&" +
    "type=" + type + "&keyword=" + keyword + "&key=${this.googleAPIKey}";
  }

  testClient() {
   return null;
  }

  getPlaces(lat: number, long: number, type: string, keyword: string, radius: number): any {
    this.init(lat, long, type, keyword, radius);
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location: new google.maps.LatLng(lat, long),
      radius: radius,
      type: type,
      openNow: true
    };
    var lieus: Lieu[] = new Array();
    service.nearbySearch(request, (result, status) => {
      for(var i = 0; i < result.length; i++){
        const res = result[i];
        const lieu = new Lieu(res.name, res.vicinity, res.rating);
        lieus.push(lieu);
      }
    });
    return lieus;
  }
}
