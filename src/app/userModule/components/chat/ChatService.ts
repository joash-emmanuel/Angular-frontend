import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Chat } from "./Chat";

@Injectable()
export class ChatService {


    constructor(private libHttp: LibHttp) {

    }

    list(logId: number, type: string): Observable<Chat[]> {

        return new Observable(observer => {
            this.libHttp.post("/chat/" + logId + "/" + type, { pageSize: 1000, pageIndex: 0 })
                .subscribe((response: DataTableResponse<Chat>) => {
                    observer.next(response.content);
                })
                ;
        })
    }

    send(chat: Chat): Observable<Chat> {
        return this.libHttp.post("/chat/save", chat);
    }


}