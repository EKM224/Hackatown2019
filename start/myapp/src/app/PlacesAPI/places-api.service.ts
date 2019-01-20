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

  getAddr(lat: number, long: number): Promise<string> {
    const latlng = new google.maps.LatLng(lat, long);
    const geo = this.geoCoder;
    return new Promise(function(fulfill, reject) {
      geo.geocode({ latLng: latlng }, (results, status) => {
        console.log(results);
        fulfill( results[0].formatted_address);
      });
    });
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

  getDistanceLatLong(debut: {lat: number, long: number}, fin: {lat: number, long: number}, travelMode: string): Promise<string> {
    const service = new google.maps.DirectionsService(this.map);
    const latlngDebut = new google.maps.LatLng(debut.lat, debut.long);
    const latlngFin = new google.maps.LatLng(fin.lat, fin.long);
    const request = {
      origin: latlngDebut,
      destination: latlngFin,
      travelMode: travelMode
    };
    return new Promise(function(fulfill, reject) {
      service.route(request, (result, status) => {
        fulfill(result.routes[0].legs[0].duration.text);
      });
    });
  }

  async getDistanceLatLongNumber(debut: {lat: number, long: number}, fin: {lat: number, long: number},
     travelMode: string): Promise<number> {
    const temps = await this.getDistanceLatLong({lat: debut.lat, long: debut.long}, {lat: fin.lat, long: fin.long}, 'WALKING');
    console.log(temps);
    const numTemps: number = this.transformStringMinutes(temps);
    return numTemps;
  }

  /*pointsPlusProche(debut: [number, number], table: [number, number][]): [number, number][] {
    const retour: [number, number][] = new Array();
    const plusPetit: number[] = new Array();
    retour[0] = [table[0][0], table[0][1]];
    retour[1] = [table[1][0], table[1][1]];
    retour[2] = [table[2][0], table[2][1]];
    plusPetit[0] = ((debut[0] - table[0][0])^2 +(debut[1] - table[0][1])^2)^(1/2);
    plusPetit[1] = ((debut[0] - table[1][0])^2 +(debut[1] - table[1][1])^2)^(1/2);
    plusPetit[2] = ((debut[0] - table[2][0])^2 +(debut[1] - table[2][1])^2)^(1/2);
    if (table.length > 2) {
      for (let i = 3; i < table.length; i++) {
        if (((debut[0] - table[i][0])^2 +(debut[1] - table[i][1])^2)^(1/2) < plusPetit[0]){
          plusPetit[0] = ((debut[0] - table[i][0])^2 +(debut[1] - table[i][1])^2)^(1/2);
          retour[0] = [table[i][0], table[i][1]];
        } else if(((debut[0] - table[i][0])^2 +(debut[1] - table[i][1])^2)^(1/2) < plusPetit[1]){
          plusPetit[1] = ((debut[0] - table[i][0])^2 +(debut[1] - table[i][1])^2)^(1/2);
          retour[1] = [table[i][0], table[i][1]];
        } else if(((debut[0] - table[i][0])^2 +(debut[1] - table[i][1])^2)^(1/2) < plusPetit[2]){
          plusPetit[2] = ((debut[0] - table[i][0])^2 +(debut[1] - table[i][1])^2)^(1/2);
          retour[2] = [table[i][0], table[i][1]];
        }
      }
    }
    return retour;
  }*/

  transformStringMinutes(str: string): number {
    const arr: string[] = str.split(' ');
    console.log(str);
    console.log(arr);
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

    return total;
  }
}

