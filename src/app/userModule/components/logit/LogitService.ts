import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Logit } from "./Logit";

@Injectable()
export class LogitService {

    public loggedIds: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    constructor(private libHttp: LibHttp) {
       
    }

    loggedByCount(shopperId: number | null = null): Observable<number> {
        let url = "/logit/loggedbycount";
        if (shopperId) {
            url += "/" + shopperId;
        }
        return this.libHttp.get(url);
    }

    logged(): Observable<Logit[]> {
        return this.libHttp.get("/logit");
    }

    logit(logId: number): Observable<Logit> {
        return this.libHttp.post("/logit/" + logId, {});
    }
}