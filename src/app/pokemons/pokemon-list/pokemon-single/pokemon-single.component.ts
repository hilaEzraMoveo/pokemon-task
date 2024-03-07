import { Component, Input} from '@angular/core';
import { Pokemon } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-single',
  templateUrl: './pokemon-single.component.html',
  styleUrl: './pokemon-single.component.scss'
})
export class PokemonSingleComponent {

  @Input() pokemon: Pokemon;

  constructor(){}

}
