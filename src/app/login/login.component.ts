import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router,
              private authService: AuthService){}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.router.navigate(['/pokemons']); 
    }
  }

  login(): void {

    if (this.authService.login(this.email)){
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/pokemons']);
    }else {
      this.errorMessage = 'Unauthorized email address';
      alert(this.errorMessage);
      this.email = '';
    }
  }

}
