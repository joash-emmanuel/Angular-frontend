import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { LogPost } from "./LogPost";
import { DataTableResponse } from '../../../lib/datatable/DataTableResponse';
import { Log } from "./Log";

@Injectable()
export class LogService {

    constructor(private libHttp: LibHttp) {

    }

    getAllLogPosts(): Observable<LogPost[]> {
        return new Observable((observer) => {
            this.libHttp.post("/logpost/datatable", { pageSize: 1000, pageIndex: 0 })
                .subscribe((response: DataTableResponse<LogPost>) => {
                    observer.next(response.content);
                })
                ;
        });
    }

    get(logId: number): Observable<Log> {
        return this.libHttp.get('/log/' + logId);
    }

    shopperLog(shopperId: number): Observable<Log[]> {
        return this.libHttp.post("/log/shopper/" + shopperId, {});
    }
}