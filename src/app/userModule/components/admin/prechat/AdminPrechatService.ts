import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Util } from "src/app/lib/utils/Util";
import { User } from "../../user/User";
import { Prechat } from "./Prechat";

@Injectable()
export class AdminPrechatService {

    constructor(private libHttp: LibHttp) {

    }

    list(): Observable<Prechat[]> {

        return new Observable((observer => {

            this.libHttp.post("/prechat/datatable", { pageSize: 100, pageIndex: 0 })
                .subscribe((response: DataTableResponse<Prechat>) => {
                    observer.next(response.content);
                });

        }));

    }

    save(Prechat: Prechat): Observable<Prechat> {
        return this.libHttp.post("/prechat/save",Prechat);
    }

    delete(id:number):Observable<Prechat>{
        return this.libHttp.delete("/prechat/"+id);
    }

}