import { Injectable } from "@angular/core";
import { Pokemon } from "../pokemons/pokemon.model";

@Injectable({
    providedIn: 'root',
})
export class SearchHistoryService{

    searchHistory: string[] = []; 

    constructor(){
        this.loadHistory();
    }

    private loadHistory(): void{
        const savedHistory = localStorage.getItem('searchHistory');
        if(savedHistory){
            this.searchHistory = JSON.parse(savedHistory);
        }
    }

    getRecentSearchesHistory(): string[] {
        return this.searchHistory;
    }

    addToHistory(pokemon: Pokemon): void {
        if(!this.searchHistory.includes(pokemon.name)){
            if (this.searchHistory.length >= 5) {
            this.searchHistory.pop(); 
            }
            this.searchHistory.unshift(pokemon.name); 
        }
        else{ 
           const index =  this.searchHistory.findIndex((pokemonName) =>  pokemonName === pokemon.name);
           if(index !== -1){
            this.searchHistory.splice(index, 1);
           }
            this.searchHistory.unshift(pokemon.name); 
        }
        this.updateLocalStotage();
    }

    private updateLocalStotage(): void {
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }

}