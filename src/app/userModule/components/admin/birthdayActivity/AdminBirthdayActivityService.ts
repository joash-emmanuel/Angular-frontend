import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { BirthdayActivity } from "./BirthdayActivity";

@Injectable()
export class AdminBirthdayActivityService {


    constructor(private libHttp: LibHttp) {

    }

    list(): Observable<BirthdayActivity[]> {

        return new Observable((observer => {

            this.libHttp.post("/birthdayactivity/datatable", { pageSize: 100, pageIndex: 0 })
                .subscribe((response: DataTableResponse<BirthdayActivity>) => {
                    observer.next(response.content);
                });

        }));

    }

    save(birthdayActivity: BirthdayActivity): Observable<BirthdayActivity> {
        return this.libHttp.post("/birthdayactivity/save", birthdayActivity);
    }

    delete(id: number): Observable<BirthdayActivity> {
        return this.libHttp.delete("/birthdayactivity/" + id);
    }

    uploadImage(birthdayActivityId: number, file: File): Observable<BirthdayActivity> {
        let formData: FormData = new FormData();

        formData.append("file",file);

        return this.libHttp.uploadFile("/birthdayactivity/uploadimage/" + birthdayActivityId, formData);
    }

}