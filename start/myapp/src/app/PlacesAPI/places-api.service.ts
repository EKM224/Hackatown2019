import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlacesAPIService {
  private placesUrl: string;
  private googleAPIKey: string;

  constructor(private http: HttpClient) {
    this.placesUrl = "AIzaSyCqS8bXAYAOrObOu6-eWUE0mCsw0tKBKMY"
    this.placesUrl = 'https://maps.googleapis.com/maps/api/place/' +
    'nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&' +
    'type=restaurant&keyword=cruise&key=AIzaSyCqS8bXAYAOrObOu6-eWUE0mCsw0tKBKMY';
   }

  testClient() {
   return null;
  }

  getPlaces(): Observable<any> {
    return this.http.get<any>(this.placesUrl);
  }
}
