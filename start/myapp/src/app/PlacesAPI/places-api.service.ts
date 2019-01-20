import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lieu } from '../Lieu';
import { async } from 'q';
declare const require: any;
declare var google;

@Injectable({
  providedIn: 'root'
})
export class PlacesAPIService {
  private map: any;

  constructor(private http: HttpClient) {
    this.map = new google.maps.Map(document.getElementById('map'));
  }

  getPlaces(lat: number, long: number, type: string, keyword: string, radius: number): Lieu[] {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location: new google.maps.LatLng(lat, long),
      radius: radius,
      type: type,
      openNow: true,
      keyword: keyword
    };
    const lieus: Lieu[] = [];
    service.nearbySearch(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        result.forEach(element => {
          const lieu: Lieu = new Lieu(element.name, element.vicinity, element.rating);
          console.log(lieu);
          lieus.push(lieu);
        });
      }
    });
    return lieus;
  }

  getDirection(debut: string, fin: string, travelMode: string): string {
    const service = new google.maps.DirectionsService(this.map);
    const request = {
      origin: debut,
      destination: fin,
      travelMode: travelMode
    };
    let temps = '';
    service.route(request, (result, status) => {
      console.log(result);
      temps = result.routes[0].legs[0].duration.text;
      console.log(temps);
    });
    return temps;
  }
}
