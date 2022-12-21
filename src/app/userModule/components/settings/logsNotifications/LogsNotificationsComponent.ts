import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Settings } from "../Settings";
import { SettingsService } from "../SettingsService";

@Component({
    templateUrl: './LogsNotificationsComponent.html'
})
export class LogsNotificationsComponent implements OnInit {

    value: number = 24;
    settings: Settings = {
        id: 0,
        logsNotifications: 0,
        timeZone: ""
    };

    constructor(private service: SettingsService) {

    }

    ngOnInit(): void {
        this.service.load().subscribe(response => {
            if (response !== null) {
                this.settings = response;
            }
        });
    }

    confirm() {
        this.service.save(this.settings).subscribe();
    }

    change(value: any) {
        this.settings.logsNotifications = value;
    }
}