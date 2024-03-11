import { Component } from '@angular/core';
import { officeLocation } from '../constants/map-data';
import { Router } from '@angular/router';
import { GoogleMapsService } from '../../services/google-maps.service';
import { mapStyle } from '../constants/map-style'; 

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss'
})
export class MyMapComponent {
  
  public map: google.maps.Map;
  showDirectionsPanel: boolean = false;
  isCustomStyleApplied: boolean = false;
  
  constructor(private router: Router, private googleMapService: GoogleMapsService) {}

  onMapReady(map: google.maps.Map){
    this.map = map
    this.googleMapService.addMap(map);
    this.googleMapService.addMarker(officeLocation, 'Office Location');

  }

  onPlaceSelected(place: google.maps.places.PlaceResult){
    this.showDirectionsPanel = false;
    this.googleMapService.onPlaceSelected(place);
  }

  showDirections() {
      this.showDirectionsPanel = !this.showDirectionsPanel;
      this.googleMapService.clearAllMarksAcceptOffice();
  }

  toggleMapStyle(){
    this.isCustomStyleApplied = !this.isCustomStyleApplied;
    this.map.setOptions({ styles: this.isCustomStyleApplied ? mapStyle : [] });
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
