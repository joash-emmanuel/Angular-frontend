import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Shopper } from "../shopper/Shopper";
import { ShopperLoaded } from "../shopper/ShopperLoaded";
import { ShopperConnection } from "./ShopperConnection";

@Injectable()
export class ShopperConnectionService {

    constructor(private libHttp: LibHttp) {

    }

    connectionCount(shopperId: number | null = null): Observable<number> {
        let url = "/shopperconnection/count";
        if (shopperId) {
            url += "/" + shopperId;
        }
        return this.libHttp.get(url);
    }

    list(shopperId: number): Observable<ShopperLoaded[]> {
        return this.libHttp.get("/shopperconnection/list/" + shopperId);
    }

    save(shopperConnection: ShopperConnection): Observable<ShopperConnection> {
        return this.libHttp.post("/shopperconnection/save", shopperConnection);
    }
}