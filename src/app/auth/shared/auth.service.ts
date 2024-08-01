import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService{

    constructor(private http: HttpClient){ }

    // getProducts(): Observable<any>{
    //     return this.http.get('/api/v1/products')
    // }

    register(userData: any): Observable<any>{
        return this.http.post('/api/v1/users/register' , userData)
        // return this.http.post('http://localhost:3001/api/v1/users/register' , userData)
    }

    login(userData: any): Observable<any>{
        return this.http.post('/api/v1/users/login' , userData)
        // return this.http.post('localhost:3001/api/v1/users/login' , userData)
    }
}
