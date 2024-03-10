import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss'
})
export class AutocompleteInputComponent implements AfterViewInit{

  @ViewChild('addressInput') addressInput: ElementRef;
  @Output() placeSelected = new EventEmitter<google.maps.places.PlaceResult>();

  ngAfterViewInit(){ 
    this.setupAutocomplete();
  }

  setupAutocomplete() { 
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();      
      this.addressInput.nativeElement.value = ''; // clear input field 
      this.placeSelected.emit(place);
    })
  }

}
