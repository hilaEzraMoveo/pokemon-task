import { Injectable } from "@angular/core";
import { defaultZoomLevel } from "../maps/constants/map-data";

@Injectable({
    providedIn: 'root',
  })
export class GoogleMapsService{

  public map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  showDirectionsPanel: boolean = false;

  addMap(map: google.maps.Map){
    this.map = map;
  }

  addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, title: string) {
    this.clearAllMarksAcceptOffice();
    this.showDirectionsPanel = false;

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: title
    });

    this.markers.push(marker);
  }

  clearAllMarksAcceptOffice(){
    for (let i = 1; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
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
  
} 

