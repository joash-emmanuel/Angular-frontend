import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AcceptInvitationLoginModalComponent } from "../../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent";
import { Shopper } from "../../shopper/Shopper";
import { ActivateWalletModalComponent } from "../../wallet/activateWalletModal/ActivateWalletModalComponent";
import { LogPost } from "../LogPost";
import { LogPostService } from "../LogPostService";
import { LogService } from "../LogService";

@Component(
    {
        templateUrl: './LogsComponent.html'
    }
)
export class LogsComponent implements OnInit {

    yourLogs: LogPost[] = [];
    suggestedLogs: LogPost[] = [];
    active = 1;
    shopper!: Shopper;

    constructor(
        private logPostService: LogPostService,
        public configService: ConfigService,
        private authenticationService: AuthenticationService,
        private modalService: NgbModal,
        private router: Router
    ) {

    }

    ngOnInit(): void {

        this.logPostService.yourLogs().subscribe(response => this.yourLogs = response);
        this.logPostService.suggestedLogs().subscribe(response => this.suggestedLogs = response);
        this.authenticationService.user.subscribe(response => this.shopper = <Shopper>response);
    }

    repost(logPostId: number) {

        if (this.shopper.admin) {
            //do nothing
        }
        else if (!this.shopper) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (!this.shopper.walletActivated) {
            this.modalService.open(ActivateWalletModalComponent);
        }
        else {
            this.router.navigate(['repost', logPostId]);
        }
    }
}