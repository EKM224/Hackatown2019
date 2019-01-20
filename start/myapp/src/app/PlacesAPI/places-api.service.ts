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
  private geoCoder;

  constructor(private http: HttpClient) {
    this.map = new google.maps.Map(document.getElementById('map'));
    this.geoCoder = new google.maps.Geocoder();
  }

  getAddr(lat: number, long: number): string {
    const latlng = new google.maps.LatLng(lat, long);
    this.geoCoder.geocode({
      'latLng': latlng
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          return results[1];
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
    return 'address could not be found';
  }

  getLatLong(addr: string): [number, number] {
    this.geoCoder.geocode({
      address: addr
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          const long = (results[0].geometry.viewport.ga.j + results[0].geometry.viewport.ga.l) / 2;
          const lat = (results[0].geometry.viewport.ma.j + results[0].geometry.viewport.ma.l) / 2;
          console.log('lat: ' + lat + '\nlong: ' + long );
          return [lat, long];
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
    return [0, 0];
  }


  getPlaces(lat: number, long: number, type: string, keyword: string, radius: number): Promise<Lieu[]> {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location: new google.maps.LatLng(lat, long),
      radius: radius,
      type: type,
      openNow: true,
      keyword: keyword
    };
    return new Promise(function(fulfill, reject) {
      service.nearbySearch(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const lieus: Lieu[] = [];
          result.forEach(element => {
            const lieu: Lieu = new Lieu(element.name, element.vicinity, element.rating);
            lieus.push(lieu);
          });
          fulfill(lieus);
        } else {
          reject('Reqest status code was not ok');
        }
      });
    });
  }

  test(testArray: Lieu[], localisation: string) {
    const wayPoints: string[] = new Array(testArray.length);
    testArray.forEach((item) => {
      wayPoints.push(item.adresse);
    });
    const service = new google.maps.DirectionsService(this.map);
    const request = {
      origin: localisation,
      destination: localisation,
      travelMode: 'WALKING',
      waypoints: wayPoints,
    };
    let temps = '';
    return new Promise(function(fulfill, reject) {
      service.route(request, (result, status) => {
        temps = result.routes[0].legs[0].duration.text;
        fulfill(temps);
      });
    });
  }


  getDirection(debut: string, fin: string, travelMode: string): Promise<string> {
    const service = new google.maps.DirectionsService(this.map);
    const request = {
      origin: debut,
      destination: fin,
      travelMode: travelMode
    };
    let temps = '';
    return new Promise(function(fulfill, reject) {
      service.route(request, (result, status) => {
        temps = result.routes[0].legs[0].duration.text;
        fulfill(temps);
      });
    });
  }
}
