import { Component } from '@angular/core';
import { defaultZoomLevel, officeLocation } from '../constants/map-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss'
})
export class MyMapComponent {

  public map: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  constructor(private router: Router) { }

  onMapReady(map: google.maps.Map){
    this.map = map;
    this.addMarker(officeLocation, 'Office Location');

  }

  addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, title: string) {
    this.clearAllMarksAcceptOffice();

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: title
    });

    this.markers.push(marker);
  }

  onPlaceSelected(place: google.maps.places.PlaceResult){
    if (place.geometry) {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(defaultZoomLevel);
      this.addMarker(place.geometry.location, place.name);
      this.map.setCenter(place.geometry.location);
    } else {
      console.error('No details available for input: ', place.name);
    }

  }

  clearAllMarksAcceptOffice(){
    for (let i = 1; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
