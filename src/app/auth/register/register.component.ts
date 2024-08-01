import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from 'express';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    errors: any = []

    // test : Date = new Date();
    // focus: any;
    // focus1: any;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {}

    // register(registerForm: { value: any; }){
    //     async this.authService.register(registerForm.value){
    //         try{
    //             console.log("Success")
    //             this.router.navigate(['/login'])
    //         }catch(err :any){
    //             console.error(err)
    //             this.errors = err.error.errors
    //         }
    //     }

    register(registerForm: { value: any; }){
        this.authService.register(registerForm.value).subscribe(
            (result) => { 
                console.log("Success")
                this.router.navigate(['/login'])
                },
            (err: HttpErrorResponse) => { 
                console.log(err)
                this.errors = err.error.errors
                }
        )

        console.log(registerForm.value)
    }
}
