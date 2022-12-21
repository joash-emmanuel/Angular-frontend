import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { BrandConnection } from "./BrandConnection";
import { BrandConnectionLoaded } from "./BrandConnectionLoaded";

@Injectable()
export class BrandConnectionService {

    constructor(private libHttp: LibHttp) {

    }

    yourBrands(shopperId: number | null = null): Observable<BrandConnectionLoaded[]> {
        

            let url = "/brandconnection/yourbrands";

            if (shopperId) {
                url += "/" + shopperId;
            }
            return this.libHttp.post(url, { pageIndex: 0, pageSize: 1000 });
    
    }

    save(brandConnection: BrandConnection): Observable<BrandConnection> {
        return this.libHttp.post('/brandconnection/save', brandConnection);
    }
}