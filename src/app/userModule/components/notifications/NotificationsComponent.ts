import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { parse } from "date-fns";
import { fi } from "date-fns/locale";
import TimeAgo from "javascript-time-ago";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { Log } from "../logs/Log";
import { LogService } from "../logs/LogService";
import { Pledge } from "../pledge/Pledge";
import { PledgeService } from "../pledge/PledgeService";
import { PledgeType } from "../pledge/PledgeType";
import { Shopper } from "../shopper/Shopper";
import { ShopperConnectionRequestService } from "../shopperconnectionrequest/ShopperConnectionRequestService";
import { Notification } from "./Notification";
import { NotificationsService } from "./NotificationsService";
import { NotificationType } from "./NotificationType";

import en from 'javascript-time-ago/locale/en'
import { ConfigService } from "src/app/config/ConfigService";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

@Component(
    {
        templateUrl: './NotificationsComponent.html'
    }
)
export class NotificationsComponent implements AfterViewInit {


    active = 1;
    logsNotifications: Notification[] = [];
    walletNotifications: Notification[] = [];
    connectsNotifications: Notification[] = [];
    loggedInShopper!: Shopper;

    constructor(private notificationService: NotificationsService,
        private shopperConnectionRequestService: ShopperConnectionRequestService,
        private pledgeService: PledgeService,
        private router: Router,
        private logService: LogService,
        private authenticationService: AuthenticationService
        ,public configService:ConfigService
    ) {

    }


    ngAfterViewInit(): void {
        this.refresh();

        this.authenticationService.user.subscribe(user => this.loggedInShopper = <Shopper>user);
    }

    refresh() {
        this.notificationService.list(NotificationType.LOG)
            .subscribe(response => this.logsNotifications = response);
        this.notificationService.list(NotificationType.WALLET)
            .subscribe(response => this.walletNotifications = response);
        this.notificationService.list(NotificationType.CONNECTION)
            .subscribe(response => this.connectsNotifications = response);
    }

    accept2WayPledge(pledge: Pledge) {

        if(this.loggedInShopper.admin){
            return;
        }
        this.pledgeService.accept2WayPledge(pledge.id)
            .subscribe();

        this.logService.shopperLog(pledge.shopper.id)
            .subscribe((logs: Log[]) => {
                this.router.navigate(['pledge', logs[0].id]);
            })

    }

    timeAgo(date: any): string {

        if (!date) {
            return "";
        }
        
        return timeAgo.format(Date.parse(date))
    }

    pledgeType(pledge: Pledge): string {
        console.log('pledge', pledge);

        if (typeof pledge.pledgeType === "string") {
            if (pledge.pledgeType === "ONEWAY") {
                return "ONEWAY";
            }
            else if (pledge.pledgeType === "TWOWAY") {
                return "TWOWAY";
            }
        }

        return "";
    }

    reject2WayPledge(pledgeId: number) {
        if(this.loggedInShopper.admin){
            return;
        }
        this.pledgeService.reject2WayPledge(pledgeId).subscribe(() => {
            this.refresh();
        });
    }

    cancelPledge(pledge: Pledge) {
        if(this.loggedInShopper.admin){
            return;
        }
        this.pledgeService.reject2WayPledge(pledge.id).subscribe(() => {
            this.refresh();
        });
    }

    acceptConnectionRequest(connectNotification: Notification) {

        if(this.loggedInShopper.admin){
            return;
        }
        this.shopperConnectionRequestService.accept(connectNotification.connectionRequest.id)
            .subscribe(() => this.refresh());
    }

    rejectConnectionRequest(connectNotification: Notification) {
        if(this.loggedInShopper.admin){
            return;
        }
        this.shopperConnectionRequestService.reject(connectNotification.connectionRequest.id)
            .subscribe(() => this.refresh());
    }

    cancelConnectionRequest(connectNotification: Notification) {
        if(this.loggedInShopper.admin){
            return;
        }
        this.shopperConnectionRequestService.reject(connectNotification.connectionRequest.id)
            .subscribe(() => this.refresh());
    }

}