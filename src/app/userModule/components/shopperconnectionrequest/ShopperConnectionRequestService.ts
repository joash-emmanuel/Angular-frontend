import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { ShopperConnection } from "../shopperconnection/ShopperConnection";
import { ShopperConnectionRequest } from "./ShopperConnectionRequest";

@Injectable()
export class ShopperConnectionRequestService {

    constructor(private libHttp: LibHttp) {

    }

    save(shopperConnectionRequest: ShopperConnectionRequest): Observable<ShopperConnectionRequest> {
        return this.libHttp.post("/shopperconnectionrequest/save", shopperConnectionRequest);
    }

    accept(id: number): Observable<void> {
        return this.libHttp.post("/shopperconnectionrequest/accept/" + id, {});
    }

    reject(id: number): Observable<void> {
        return this.libHttp.delete("/shopperconnectionrequest/" + id);
    }

    cancel(id: number): Observable<void> {
        return this.libHttp.delete("/shopperconnectionrequest/" + id);
    }
}