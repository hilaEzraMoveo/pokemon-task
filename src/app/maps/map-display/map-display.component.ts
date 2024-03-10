import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { officeLocation, defaultZoomLevel } from '../constants/map-data';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss'
})
export class MapDisplayComponent implements AfterViewInit{

  @ViewChild('mapContainer') mapContainer: ElementRef;
  @Output() mapReady = new EventEmitter<google.maps.Map>();
  private map: google.maps.Map;


  ngAfterViewInit(): void {
    this.initMap(); 
 }

 initMap(): void {
  this.map = new google.maps.Map(this.mapContainer.nativeElement, {
    center: officeLocation,
    zoom: defaultZoomLevel,
  });

  this.mapReady.emit(this.map);
 }

}

