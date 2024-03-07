import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-pokemons-filters',
  templateUrl: './pokemons-filters.component.html',
  styleUrl: './pokemons-filters.component.scss'
})
export class PokemonsFiltersComponent {

    allTypes: string[] = [];
    searchName: string = "";  
    selectedType: string = "";

    @Output() searchRequested: EventEmitter<string> = new EventEmitter<string>();
    @Output() typeSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor( private pokemonService: PokemonService){}

    ngOnInit(): void {
      this.pokemonService.getAllTypes().subscribe((typesArr) => {
        this.allTypes = typesArr;
      });;
    }

    filterPokemonByType(): void { 
      this.typeSelected.emit(this.selectedType);
    }

    onNameSearch() {
      this.searchRequested.emit(this.searchName.toLocaleLowerCase());
    }

}
