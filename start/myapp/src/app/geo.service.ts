import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  lat: any;
  long: any;

  constructor() { }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>this.showPosition(pos));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
  }
}
