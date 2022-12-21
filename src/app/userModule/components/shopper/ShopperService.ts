import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { BirthdayActivity } from "../admin/birthdayActivity/BirthdayActivity";
import { Shopper } from "./Shopper";

@Injectable()
export class ShopperService {

    constructor(private libHttp: LibHttp) {

    }

    get(shopperId: number): Observable<Shopper> {
        return this.libHttp.get("/shopper/" + shopperId);
    }

    save(shopper: Shopper): Observable<Shopper> {
        return this.libHttp.post("/shopper", shopper);
    }

    uploadProfilePic(shopperId: number, file: File): Observable<Shopper> {
        let formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        return this.libHttp.uploadFile("/shopper/uploadprofilepic/" + shopperId, formData);
    }

    search(term: string): Observable<Shopper[]> {
        return this.libHttp.get("/shopper/search/" + term)
    }

    list(): Observable<Shopper[]> {
        return this.libHttp.get("/shopper/list")
    }

    suggestedConnects(): Observable<Shopper[]> {
        return this.libHttp.get("/shopperconnection/suggestedconnects");
    }
}