import { Component } from "@angular/core";
import { Settings } from "../Settings";
import { SettingsService } from "../SettingsService";

@Component({
    templateUrl: './TimeZoneComponent.html'
})
export class TimeZoneComponent {


    settings!: Settings;
    value!: string;

    constructor(private service: SettingsService) {

    }

    ngAfterViewInit(): void {
        this.service.load().subscribe(response => this.settings = response);
    }

    confirm() {
        this.settings.timeZone = this.value;
        this.service.save(this.settings).subscribe();
    }
}