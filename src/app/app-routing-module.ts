import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { LoginComponent } from './login/login.component';
import { MyMapComponent } from './maps/my-map/my-map.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'my-map' , component: MyMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
