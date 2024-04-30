import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from '../pokemons/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiURL: string =
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(this.apiURL)
      .pipe(
        mergeMap((response) => {
          const results = response.results;
          const observables: Observable<Pokemon>[] = results.map(
            (pokemonInfo: any, index: number) => {
              return this.getPokemonDetails(index + 1, pokemonInfo.url);
            }
          );
          return forkJoin(observables);
        })
      );
  }

  getPokemons(page: number, itemsPerPage: number): Observable<Pokemon[]> {
    const offset = (page - 1) * itemsPerPage;
    const limit = itemsPerPage;
    console.log(offset, limit);
    const apiUrl = `${this.apiUrl}?offset=${offset}&limit=${limit}`;

    return this.http
      .get<{ results: { name: string; url: string }[] }>(apiUrl)
      .pipe(
        mergeMap((response) => {
          const results = response.results;
          console.log(results);
          const observables: Observable<Pokemon>[] = results.map(
            (pokemonInfo: any, index: number) => {
              return this.getPokemonDetails(index + 1, pokemonInfo.url);
            }
          );
          return forkJoin(observables);
        })
      );
  }

  private getPokemonDetails(id: number, url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map((pokemonInfo) => {
        const pokemon: Pokemon = {
          id: id,
          name: pokemonInfo.name,
          image: pokemonInfo.sprites.front_default,
          abilities: pokemonInfo.abilities.map(
            (ability: any) => ability.ability.name
          ),
          types: pokemonInfo.types.map((type: any) => type.type.name),
        };
        return pokemon;
      })
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon> {
    return this.http
      .get<any>(`${this.apiUrl}${pokemonId}`)
      .pipe(map((pokemonInfo) => this.mapPokemon(pokemonInfo)));
  }

  private mapPokemon(pokemonInfo: any): Pokemon {
    const pokemon: Pokemon = {
      id: pokemonInfo.id,
      name: pokemonInfo.name,
      image: pokemonInfo.sprites.front_default,
      abilities: pokemonInfo.abilities.map(
        (ability: any) => ability.ability.name
      ),
      types: pokemonInfo.types.map((type: any) => type.type.name),
    };
    return pokemon;
  }

  getAllTypes(): Observable<string[]> {
    return this.getAllPokemons().pipe(
      map((pokemons) => {
        const allTypes: string[] = [];
        pokemons.forEach((pokemon) => {
          pokemon.types.forEach((type: string) => {
            if (!allTypes.includes(type)) {
              allTypes.push(type);
            }
          });
        });
        return allTypes;
      })
    );
  }
}
