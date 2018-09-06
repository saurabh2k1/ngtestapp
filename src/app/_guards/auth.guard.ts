import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        if(localStorage.getItem('currentUser')) {
            //Logged in so return true
            return true;
        }
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
        return false;
    }
}