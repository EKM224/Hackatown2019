import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('map') mapElement;
  map: any;
  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    // Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
  }
}
