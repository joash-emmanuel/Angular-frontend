import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Notification } from "./Notification";
import { NotificationType } from "./NotificationType";

@Injectable()
export class NotificationsService {

    constructor(private libHttp: LibHttp) {

    }


    list(type: NotificationType): Observable<Notification[]> {

        return new Observable(observer => {
            this.libHttp.post("/notification/" + type, { pageIndex: 0, pageSize: 30 })
                .subscribe((response: DataTableResponse<Notification>) => {
                    observer.next(response.content);
                })
                ;
        })
    }
}