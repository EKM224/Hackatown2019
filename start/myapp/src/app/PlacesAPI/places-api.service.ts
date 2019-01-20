import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
declare const require: any;
// const google = require('@types/googlemaps');

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
    this.placesUrl = `https://maps.googleapis.com/maps/api/place/` +
    `nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&` +
    `type=restaurant&keyword=cruise&key=${this.googleAPIKey}`;
   }

  testClient() {
   return null;
  }

  getPlaces(): any {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      query: 'Museum of Contemporary Art Australia',
      fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    };

    service.findPlaceFromQuery(request, (result, status) => {
      console.log(result);
    });
    return 'yo mama';
  }
}
