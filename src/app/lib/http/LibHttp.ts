import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/ConfigService';

@Injectable()
export class LibHttp {

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService
    ) {

    }

    getHttpOptions(): object {

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };
    }

    delete(url:string):Observable<any>{
        return this.httpClient.delete(this.configService.getServerUrl()+url,this.getHttpOptions());
    }

    post(url: string, data: object): Observable<any> {

        return this.httpClient.post(
            this.configService.getServerUrl() + url,
            data,
            this.getHttpOptions()
        );
    }

    postForm(url: string, data: string): Observable<any> {

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            withCredentials: true
        };

        return this.httpClient.post(
            this.configService.getServerUrl() + url,
            data,
            options
        );

    }
    uploadFiles(url: string, files: File[]): Observable<any> {
        let formData = new FormData();
        files.forEach(file => {
            console.log('file', file);
            formData.append(file.name, file, file.name);
        });
        return this.uploadFile(url, formData);
    }

    uploadFile(url: string, formData: FormData): Observable<any> {
        return this.httpClient.post(
            this.configService.getServerUrl() + url,
            formData,
            {
                withCredentials: true,
                headers: {

                }
            }
        );
    }

    get(url: string): Observable<any> {
        return this.httpClient.get(
            this.configService.getServerUrl() + url,
            this.getHttpOptions()
        );
    }
}