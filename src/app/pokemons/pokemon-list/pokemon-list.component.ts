import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model'
import { PokemonService } from '../../services/pokemon.service';
import { AuthService } from '../../services/auth.service';
import { SearchHistoryService } from '../../services/search-history.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit{

  pokemons: Pokemon[] = [];
  pokemonsByFilters: Pokemon[] = [];

  selectedPokemon: Pokemon;
  isDetailsVisible: boolean = false; 

  selectedType: string = '';
  selectedName: string = '';
  searchHistory: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    private authService: AuthService,
    private searchHistoryService: SearchHistoryService
    ){}

  ngOnInit(): void {
    this.getPokemons();
    this.searchHistory = this.searchHistoryService.getRecentSearchesHistory();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.pokemonsByFilters = pokemons;
      },
      (error) => {
        console.error('Error fetching Pokemon list', error);
      }
    );
  }

  goToPokemonDetails(pokemon: Pokemon): void {

    //only if I'm doing some searches 
    //if(this.selectedName || this.selectedType){
      this.searchHistoryService.addToHistory(pokemon);
      this.searchHistoryService.getRecentSearchesHistory();
   // }
    this.selectedPokemon = pokemon;
    this.isDetailsVisible = true;
  }

  searchAndDisplayPokemonByName(pokemonName: string): void {
    this.selectedName = pokemonName;
    this.filterPokemons();
  }

  searchAndDisplayPokemonsByType(selectedType: string): void {
    this.selectedType = selectedType;
    this.filterPokemons();
  }

  filterPokemons(): void {
    let typeFilteredPokemons =
      this.selectedType 
        ? this.pokemons.filter((pokemon) =>
            pokemon.types.some((type) => this.selectedType.includes(type))
          )
        : this.pokemons;

      typeFilteredPokemons = typeFilteredPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(this.selectedName.toLowerCase()));

      this.pokemonsByFilters = typeFilteredPokemons;
  }

  logout(): void {
    this.authService.logout();
  }

  toggleVisible(): void {
    this.isDetailsVisible = false;
  }
  preventToggle(event: Event): void {
    event.stopPropagation();
  }

}
