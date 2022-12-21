import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Shopper } from "../shopper/Shopper";

@Injectable()
export class AcceptInvitationService {

    constructor(private libHttp: LibHttp) {

    }

    verifyCode(code: string): Observable<Shopper> {

        return new Observable(subscriber => {

            this.libHttp.get('/invitation/verifycode/' + code)
                .subscribe({
                    next: (response: Shopper) => {
                        subscriber.next(response);
                    },
                    error: error => {
                        subscriber.error()
                    }
                })
                ;
        });
    }

    verifyEmail(request: object): Observable<any> {
        return this.libHttp.post("/invitation/verifyemail", request);
    }

    verifyOTP(request:object):Observable<any>{
        return this.libHttp.post("/invitation/verifyOTP", request);
    }

    saveThankYouMessage(request:object):Observable<any>{
        return this.libHttp.post("/invitation/thankinviter", request);
    }
}