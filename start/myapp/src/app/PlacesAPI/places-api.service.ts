import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
      query: 'Museum of Contemporary Art Australia',
      fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    };
    var nom:string;
    service.findPlaceFromQuery(request, (result, status) => {
      nom = result;
      console.log(result);
    });
    return nom;
  }
}
