import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { LoginComponent } from "src/app/@shared/components/login/login.component";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBaseUrl : string = "http://localhost:8080/users/"
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(loginData: LoginDTO) {
    // TODO Chiamare il servizio per l'autenticazione e salvare l'utente corrente nel localStorage
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(loginData.username+":"+loginData.password)
        })
      };
    
    return this.httpClient.get<Partial<LoginDTO>>(`${this.springBaseUrl}username/${loginData.username}/password/${loginData.password}`, httpOptions);
    //return of('login ok');
  }

  saveUserInLocalStorage(loginData: Partial<LoginDTO>){

    localStorage.setItem("user", JSON.stringify(loginData));
    return of('login ok');
  }

  register(registerData: Partial<RegisterDTO>) {
    // TODO Chiamare il servizio per la registrazione e redirigere l'utente alla root per il login
        return this.httpClient.post<RegisterDTO>(`${this.springBaseUrl}`, registerData);
        //this.router.navigateByUrl("/");
       }
       

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

}
