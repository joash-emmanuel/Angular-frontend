import { O } from "@angular/cdk/keycodes";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { LogPost } from "./LogPost";
import { LogPostListing } from "./LogPostListing";

@Injectable()
export class LogPostService {

    constructor(private libHttp: LibHttp) {

    }

    save(logPost: LogPost): Observable<LogPost> {
        return this.libHttp.post("/logpost/save", logPost);
    }

    get(logPostId: number): Observable<LogPost> {
        return this.libHttp.get("/logpost/" + logPostId)
    }

    yourLogs(): Observable<LogPost[]> {
        return new Observable(observer => {
            let url = '/logpost/yourlogs';
            this.libHttp.post(url, { pageIndex: 0, pageSize: 30 })
                .subscribe((response: DataTableResponse<LogPost>) => {
                    observer.next(response.content)
                });
            ;

        });
    }

    shopperLogs(shopperId: number): Observable<LogPost[]> {
        return this.libHttp.get("/logpost/shopper/" + shopperId);
    }

    suggestedLogs(): Observable<LogPost[]> {
        return this.libHttp.post("/logpost/suggestedlogs", {});
    }

    uploadImage(logPostId: number, image: File): Observable<LogPost> {

        let formData = new FormData();
        formData.append("file", image);
        formData.append("name", image.name);

        return this.libHttp.uploadFile("/logpost/uploadlogpostimage/" + logPostId, formData);
    }

    list(): Observable<LogPostListing[]> {
        return this.libHttp.post("/logpost/list", {});
    }

    single(logPostId: number): Observable<LogPostListing> {
        return this.libHttp.post("/logpost/single/" + logPostId, {});
    }


}