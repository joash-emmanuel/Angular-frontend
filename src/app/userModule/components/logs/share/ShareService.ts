import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";

@Injectable()
export class ShareService {

    constructor(private libHttp: LibHttp) {

    }

    shareWhatsapp(logPostId: number): Observable<void> {
        return this.libHttp.post("/share/whatsapp/" + logPostId, {});
    }
}