import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { Brand } from "./Brand";
import { BrandLoaded } from "./BrandLoaded";

@Injectable()
export class BrandService {

    constructor(private libHttp: LibHttp) {

    }

    endorsed(pageIndex: number, pageSize: number): Observable<BrandLoaded[]> {
        return  this.libHttp.post("/brand/datatable", { pageIndex, pageSize });
    }

    get(id: number): Observable<Brand> {
        return this.libHttp.get("/brand/" + id);
    }

    save(brand: Brand): Observable<Brand> {
        return this.libHttp.post("/brand/save", brand);
    }

    uploadImage(brandId: number, file: File): Observable<Brand> {

        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        
        return this.libHttp.uploadFile('/brand/uploadimage/' + brandId, formData);
    }
}