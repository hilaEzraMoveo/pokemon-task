import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
  })
export class AuthService{

    correctEmai: string = 'demo@skills.co.il';
    constructor( 
        private router: Router
    ){}

    login(email: string): boolean {
        if(email === this.correctEmai){
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('isLoggedIn')
        this.router.navigate(['/']);
    }

}