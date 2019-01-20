import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'google-map',
  templateUrl: './map.page.html'
})
export class GoogleMapComponent {

  @ViewChild('map') mapElement;
  map: any;
  constructor() {
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    const coords = new google.maps.LatLng(25, 80);
    const mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords
    });

  }

}
