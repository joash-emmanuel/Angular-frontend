import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { ShopperConnectionValue } from "./ShopperConnectionValue";

@Injectable()
export class AdminShopperConnectionValueService {

    constructor(private libHttp: LibHttp) {

    }

    list(): Observable<ShopperConnectionValue[]> {

        return new Observable((observer => {

            this.libHttp.post("/shopperconnectionvalue/datatable", { pageSize: 100, pageIndex: 0 })
                .subscribe((response: DataTableResponse<ShopperConnectionValue>) => {
                    observer.next(response.content);
                });

        }));

    }

    save(ShopperConnectionValue: ShopperConnectionValue): Observable<ShopperConnectionValue> {
        return this.libHttp.post("/shopperconnectionvalue/save",ShopperConnectionValue);
    }

    delete(id:number):Observable<ShopperConnectionValue>{
        return this.libHttp.delete("/shopperconnectionvalue/"+id);
    }

}