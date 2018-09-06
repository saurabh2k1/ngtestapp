import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthenticationService, MessageService } from "../_services";
import { Observable } from "rxjs";
import { _throw } from 'rxjs/observable/throw';
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService, 
        private messageService: MessageService ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if(err.status === 401) {
                    // auto logout if 401 returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                }
                if(err.status === 422) {
                    return _throw("Validation Error!");
                }

                const error = err.error.message || err.statusText;
                return _throw(error);
            }))       
    }
}