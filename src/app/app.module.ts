import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemons/pokemon-details/pokemon-details.component';
import { PokemonSingleComponent } from './pokemons/pokemon-list/pokemon-single/pokemon-single.component';
import { PokemonsFiltersComponent } from './pokemons/pokemons-filters/pokemons-filters.component';
import { LoginComponent } from './login/login.component';
import { MyMapComponent } from './maps/my-map/my-map.component';
import { MapDisplayComponent } from './maps/map-display/map-display.component';
import { AutocompleteInputComponent } from './maps/autocomplete-input/autocomplete-input.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonSingleComponent,
    PokemonDetailsComponent,
    PokemonsFiltersComponent,
    LoginComponent,
    MyMapComponent,
    MapDisplayComponent,
    AutocompleteInputComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
