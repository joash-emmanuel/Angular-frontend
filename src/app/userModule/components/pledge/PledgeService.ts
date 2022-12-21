import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Pledge } from "./Pledge";
import { PledgeRequest } from "./PledgeRequest";

@Injectable()
export class PledgeService {

    constructor(private libHttp: LibHttp) {

    }

    list(logId: number): Observable<Pledge[]> {
        return this.libHttp.get("/pledge/list/" + logId);
    }

    total(logId: number): Observable<number> {
        return this.libHttp.get("/pledge/total/" + logId);
    }

    delete(id: number): Observable<void> {
        return this.libHttp.delete("/pledge/" + id);
    }

    reject2WayPledge(id: number): Observable<void> {
        return this.delete(id);
    }

    accept2WayPledge(id: number): Observable<void> {
        return this.libHttp.post("/pledge/accept/" + id, {});
    }

    otp(): Observable<void> {
        return this.libHttp.post('/pledge/otp', {});
    }

    request(pledgeRequest: PledgeRequest): Observable<Pledge> {
        return this.libHttp.post("/pledge/request", pledgeRequest);
    }

}