import { AfterViewInit, Component } from "@angular/core";
import { ConfigService } from "src/app/config/ConfigService";
import { Balance } from "../wallet/Balance";
import { WalletService } from "../WalletService";
import { WalletTransaction } from "../WalletTransaction";
import TimeAgo from "javascript-time-ago";
const timeAgo = new TimeAgo('en-US');
@Component(
    {
        templateUrl: './WalletDetailsComponent.html'
    }
)
export class WalletDetailsComponent implements AfterViewInit {

    balance: Balance = { current: 0.0, available: 0.0 };
    itemized: WalletTransaction[] = [];

    constructor(private service: WalletService, public configService: ConfigService) {

    }

    ngAfterViewInit(): void {

        this.service.balance().subscribe(response => this.balance = response);

        this.service.itemized(100, 0).subscribe(response => {
            this.itemized = response;

            console.log('itemized', this.itemized);

        });

    }


    timeAgo(date: any): string {

        if (!date) {
            return "";
        }

        return timeAgo.format(Date.parse(date))
    }
}