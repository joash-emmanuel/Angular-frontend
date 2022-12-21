import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { BrandConnectionValue } from "./BrandConnectionValue";

@Injectable()
export class AdminBrandConnectionValueService {

    constructor(private libHttp: LibHttp) {

    }

    list(): Observable<BrandConnectionValue[]> {

        return new Observable((observer => {

            this.libHttp.post("/brandconnectionvalue/datatable", { pageSize: 100, pageIndex: 0 })
                .subscribe((response: DataTableResponse<BrandConnectionValue>) => {
                    observer.next(response.content);
                });

        }));

    }

    save(BrandConnectionValue: BrandConnectionValue): Observable<BrandConnectionValue> {
        return this.libHttp.post("/brandconnectionvalue/save",BrandConnectionValue);
    }

    delete(id:number):Observable<BrandConnectionValue>{
        return this.libHttp.delete("/brandconnectionvalue/"+id);
    }

}