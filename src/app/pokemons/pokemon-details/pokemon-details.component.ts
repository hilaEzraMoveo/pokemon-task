import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit{

  pokemon: Pokemon; 

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService){}

  ngOnInit(): void {

    const pokemonId = +this.route.snapshot.paramMap.get('id');

    this.pokemonService.getPokemonById(pokemonId).subscribe(
      (pokemon: Pokemon) => {
        this.pokemon = pokemon;
      }, 
      (error)=> {
        console.error('Error fetching Pokemon details:', error);
      })
  }
}
