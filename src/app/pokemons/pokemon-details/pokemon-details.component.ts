import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {

   @Input() pokemon: Pokemon;

   constructor() {}
  }