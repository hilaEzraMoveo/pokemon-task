import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { officeLocation, homeLocation } from '../constants/map-data';

@Component({
  selector: 'app-map-direction',
  templateUrl: './map-direction.component.html',
  styleUrl: './map-direction.component.scss'
})
export class MapDirectionComponent implements OnChanges{

  @Input() map: google.maps.Map;
  @Input() show: boolean = false; 

  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  constructor() { 
    console.log(this.show);
    this.initializeDirections();
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.show);
    if (!this.directionsRenderer) {
      return;
    }

    if (changes.show) {
      if (this.show) {
        this.displayDirections();
      } else {
        this.directionsRenderer.setMap(null);
      }
    }
  }

  initializeDirections(){
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  displayDirections() {
    if (!this.map || !this.directionsRenderer) {
      return;
    }

    const request: google.maps.DirectionsRequest = {
      origin: homeLocation,
      destination: officeLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
        this.directionsRenderer.setMap(this.map);
      } else {
        console.error('Directions request failed due to: ' + status);
      }
    });
  }

}
