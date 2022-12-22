import { L } from '@angular/cdk/keycodes';
import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../userModule/components/user/User';
import { AuthenticationService } from './AuthenticationService';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private jwtHelperService: JwtHelperService) {

        console.log('auth guard contructor');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        if (this.jwtHelperService.isTokenExpired()) {
            this.router.navigate([""]);
        }
        console.log('auth guard canactivate');
        return new Observable(observer => {
            console.log('auth guard canactivate observable');
            console.log("state.url", state.url);
            this.authenticationService.user.subscribe({
                next: (user: User | boolean | null) => {

                    if (user === false) {
                        observer.next(this.router.parseUrl("/register"));
                        return;
                    }
                    else if (user === null) {
                        return;
                    }
                    /*
                    else if (typeof user === "object" && user.forcePasswordChange === true && state.url !== '/changepassword') {
                        observer.next(this.router.parseUrl("/changepassword"));
                        return;
                    }
                    */
                    else if (typeof user === "object" && user.id != null) {
                        observer.next(true);
                        return;
                    }
                },
                error: error => {
                    console.log('auth guard error', error);
                    observer.next(false);
                }
            });
        });

    }


}