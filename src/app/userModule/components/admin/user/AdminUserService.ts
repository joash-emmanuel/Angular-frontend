import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Util } from "src/app/lib/utils/Util";
import { User } from "../../user/User";
import { AdminUser } from "./AdminUser";

@Injectable()
export class AdminUserService {

    constructor(private libHttp: LibHttp) {

    }

    list(): Observable<AdminUser[]> {

        return new Observable((observer => {

            this.libHttp.post("/adminuser/datatable", { pageSize: 100, pageIndex: 0 })
                .subscribe((response: DataTableResponse<AdminUser>) => {
                    observer.next(response.content);
                });

        }));

    }

    save(adminUser: AdminUser): Observable<AdminUser> {
        return this.libHttp.post("/adminuser/save",adminUser);
    }

    delete(id:number):Observable<AdminUser>{
        return this.libHttp.delete("/adminuser/"+id);
    }

}