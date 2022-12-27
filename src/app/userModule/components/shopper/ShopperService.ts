import { HostListener, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { BirthdayActivity } from "../admin/birthdayActivity/BirthdayActivity";
import { Shopper } from "./Shopper";

@Injectable()
export class ShopperService {
    innerWidth: any;
    displayedProfilPic = "";

    constructor(private libHttp: LibHttp) {
        this.innerWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth;
    }

    getProfilePic(picturesstr: any) {
        const pictures = JSON.parse(picturesstr);
        if (this.innerWidth <= 400) {
            this.displayedProfilPic = pictures.small;
        } else if (this.innerWidth <= 768 && this.innerWidth > 400) {
            this.displayedProfilPic = pictures.medium;
        } else if (this.innerWidth > 768) {
            this.displayedProfilPic = pictures.large;
        }
        return this.displayedProfilPic;
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