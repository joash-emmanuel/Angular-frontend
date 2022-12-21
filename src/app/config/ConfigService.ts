import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './Config';

@Injectable()
export class ConfigService {

    private config: Config = new Config();

    constructor(private httpClient: HttpClient) {
        this.getConfigs();
    }

    private getConfigs() {

        if (localStorage.getItem("config") !== null) {
            let config = localStorage.getItem("config");
            this.config = config != null ? JSON.parse(config) : {};
        }

        this.httpClient.get<Config>('/configs/config.json', { withCredentials: true })
            .subscribe((response: Config) => {
                this.config = response;
                localStorage.setItem("config", JSON.stringify(this.config));
            });
    }

    public getServerUrl(): string {

        return this.config.serverUrl;

    }

}