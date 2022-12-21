import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Util } from "src/app/lib/utils/Util";
import { User } from "../../user/User";
import { LogStory } from "./LogStory";

@Injectable()
export class AdminLogStoryService {

    constructor(private libHttp: LibHttp) {

    }

    list(): Observable<LogStory[]> {

        return new Observable((observer => {

            this.libHttp.post("/logstory/datatable", { pageSize: 100, pageIndex: 0 })
                .subscribe((response: DataTableResponse<LogStory>) => {
                    observer.next(response.content);
                });

        }));

    }

    save(LogStory: LogStory): Observable<LogStory> {
        return this.libHttp.post("/logstory/save",LogStory);
    }

    delete(id:number):Observable<LogStory>{
        return this.libHttp.delete("/logstory/"+id);
    }

}