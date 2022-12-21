import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { LogImage } from "./LogImage";

@Injectable()
export class LogImageService {

    constructor(private libHttp: LibHttp) {

    }
    
    save(logImage: LogImage): Observable<LogImage> {
        return this.libHttp.post("/logimage/save", logImage);
    }
}