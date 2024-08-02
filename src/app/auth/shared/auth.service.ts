import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from "moment";
import { Router } from "@angular/router";


const jwt = new JwtHelperService()

class DecodedToken{
    userId: String = ''
    username: string = ''
    exp: number = 0
}

@Injectable()
export class AuthService{
    private decodedToken

    constructor(private http: HttpClient,
                private router: Router
    ){
        // this.decodedToken = JSON.parse(localStorage.getItem('app-meta')) || new DecodedToken()
        // this.decodedToken = tokenString ? (JSON.parse(tokenString) as DecodedToken) : new DecodedToken();
        const tokenString = localStorage.getItem('app-meta');
        this.decodedToken = tokenString ? JSON.parse(tokenString) : new DecodedToken();
     }

    // getProducts(): Observable<any>{
    //     return this.http.get('/api/v1/products')
    // }

    getToken(){
        return localStorage.getItem('app-auth')
    }
    

    isAuthenticated(){
        return moment().isBefore(moment.unix(this.decodedToken.exp))
    }

    register(userData: any): Observable<any>{
        return this.http.post('/api/v1/users/register' , userData)
        // return this.http.post('http://localhost:3001/api/v1/users/register' , userData)
    }

    login(userData: any): Observable<any>{
        
        return this.http.post('/api/v1/users/login' , userData).pipe(map(
            (token: any) => {
                this.decodedToken = jwt.decodeToken(token)
                localStorage.setItem('app-auth', token)
                localStorage.setItem('app-auth', JSON.stringify(this.decodedToken))
                return token
            }
        ))
        // return this.http.post('localhost:3001/api/v1/users/login' , userData)
    }

    logout(){
        localStorage.removeItem('app-auth')
        localStorage.removeItem('app-meta')
        this.decodedToken = new DecodedToken()
        this.router.navigate(['/login'])
    }

}
