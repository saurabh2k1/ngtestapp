import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser && currentUser.id) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUser.id}`
                }
            });
        }

        return next.handle(request);
    }
}