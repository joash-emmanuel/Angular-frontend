import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpRequest, HttpHandler, HttpEvent, HttpXsrfTokenExtractor, HttpInterceptor} from "@angular/common/http";

@Injectable()
export class LibHttpXsrfInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const headerName = 'X-XSRF-TOKEN';
        let token = this.tokenExtractor.getToken() as string;
        if (token !== null) {
            req = req.clone({headers: req.headers.set(headerName, token)});
        }
        return next.handle(req);
    }
}