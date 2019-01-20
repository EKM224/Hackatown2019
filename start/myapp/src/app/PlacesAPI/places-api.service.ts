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
          console.log('addresse: ' + addr + '\nlat: ' + lat + '\nlong: ' + long );
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

  getLatLongArray(adrdresses: string[]): [number, number][] {
    const retour: [number, number][] = new Array();
    adrdresses.forEach(item => {
      retour.push(this.getLatLong(item));
    });

    return retour;
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

  getDistanceAddr(debut: string, fin: string, travelMode: string): Promise<number> {
    const service = new google.maps.DirectionsService(this.map);
    const request = {
      origin: debut,
      destination: fin,
      travelMode: travelMode
    };
    let temps = 0;
    return new Promise(function(fulfill, reject) {
      service.route(request, (result, status) => {
        temps = this.transformStringMinutes(result.routes[0].legs[0].duration.text);
        fulfill(temps);
      });
    });
  }

  getDistanceLatLong(debut: [number, number], fin: [number, number], travelMode: string): Promise<number> {
    const service = new google.maps.DirectionsService(this.map);
    const latlngDebut = new google.maps.LatLng(debut[0], debut[1]);
    const latlngFin = new google.maps.LatLng(fin[0], fin[1]);
    const request = {
      origin: debut,
      destination: fin,
      travelMode: travelMode
    };
    let temps = 0;
    return new Promise(function(fulfill, reject) {
      service.route(request, (result, status) => {
        temps = this.transformStringMinutes(result.routes[0].legs[0].duration.text);
        fulfill(temps);
      });
    });
  }

  transformStringMinutes(str: string): number {
    const arr: string[] = str.split(' ');
    let multiplicateur = 1;
    let total = 0;
    for (let i = 1; i < arr.length; i += 2) {
      switch (arr[i].toLowerCase()) {
        case 'day':
        case 'days':
        case 'jour':
        case 'jours': multiplicateur = 24 * 60;
        break;

        case 'heure':
        case 'heures':
        case 'hour':
        case 'hours': multiplicateur = 60;
        break;

        default: multiplicateur = 1;
      }
      total += multiplicateur * Number(arr[i - 1]);
    }

    return 0;
  }
}
