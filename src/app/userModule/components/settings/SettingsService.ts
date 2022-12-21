import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Settings } from "./Settings";

@Injectable()
export class SettingsService {

    constructor(private libHttp: LibHttp) {

    }

    save(settings: Settings): Observable<Settings> {
        return this.libHttp.post("/settings", settings);
    }

    load():Observable<Settings> {
        return this.libHttp.get("/settings");
    }
}