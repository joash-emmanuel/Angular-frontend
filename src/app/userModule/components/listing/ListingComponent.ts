import { AfterViewInit, Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { AcceptInvitationLoginModalComponent } from "../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent";
import { ActivateWalletModalComponent } from "../wallet/activateWalletModal/ActivateWalletModalComponent";
import { Log } from "../logs/Log";
import { LogPost } from "../logs/LogPost";
import { LogService } from "../logs/LogService";
import { Shopper } from "../shopper/Shopper";
import { User } from "../user/User";
import { Router } from "@angular/router";
import { LogitService } from "../logit/LogitService";
import { ConfigService } from "src/app/config/ConfigService";
import { ShopperConnectionService } from "../shopperconnection/ShopperConnectionService";
import { LogPostService } from "../logs/LogPostService";
import { LogPostListing } from "../logs/LogPostListing";
import { ShopperService } from "../shopper/ShopperService";

@Component(
    {
        templateUrl: './ListingComponent.html'
    }
)
export class ListingComponent implements AfterViewInit {
    logPostListings: LogPostListing[] = [];

    user: User | boolean | null = null;

    connectedShopperIds: number[] = [];


    constructor(private logService: LogService, private modalService: NgbModal,
        private authenticationService: AuthenticationService,
        private router: Router,
        private logitService: LogitService,
        public configService: ConfigService,
        private shopperConnectionService: ShopperConnectionService,
        private logPostService: LogPostService,
        public shopperService: ShopperService
    ) {

    }


    ngAfterViewInit(): void {

        this.logPostService.list().subscribe(response => this.logPostListings = response);

        this.authenticationService.user.subscribe(user => {

            if (!user) {
                return;
            }

            this.user = user;
            let shopper = <Shopper>user;

            this.shopperConnectionService.list(shopper.id).subscribe(response =>
                this.connectedShopperIds = response.map(v => v.id));
        });
    }

    connected(shopperId: number): boolean {
        let user = <Shopper>this.user;
        return this.connectedShopperIds.includes(shopperId) && shopperId !== user.id;
    }

    pledge(log: Log) {
        console.log('pledge user', this.user);
        console.log('instanceof Object ', this.user instanceof Object);
        if (this.user === false || this.user === null) {
            console.log('not logged in');
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not activated');
            this.modalService.open(ActivateWalletModalComponent);
        } else {
            this.router.navigate(['pledge', 'listgifters', log.id]);
        }
    }

    chat(logId: number) {
        if (this.user === false || this.user === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not activated');
            this.modalService.open(ActivateWalletModalComponent);
        }
        else {
            this.router.navigate(['chat', logId])
        }
    }

    repost(logPost: LogPost) {
        let user = <Shopper>this.user;
        if (this.user === false || this.user === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (this.user instanceof Object && this.user.admin) {
            //do nothing
        }
        else if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not activated');
            this.modalService.open(ActivateWalletModalComponent);
        }
        else if (logPost.log.shopper.id !== user.id) {
            //do nothing
        }
        else {
            this.router.navigate(['repost', logPost.id])
        }
    }

    share(logPost: LogPost) {
        if (this.user === false || this.user === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (this.user instanceof Object && this.user.admin) {
            //do nothing
        }
        else if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not activated');
            this.modalService.open(ActivateWalletModalComponent);
        }
        else {
            this.router.navigate(['share', logPost.id])
        }
    }

    logIt(logPostListing: LogPostListing) {
        if (this.user === false || this.user === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (this.user instanceof Object && this.user.admin) {
            //do nothing
        }
        else if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not activated');
            this.modalService.open(ActivateWalletModalComponent);
        }
        else {
            this.logitService.logit(logPostListing.logPost.log.id).subscribe(response => {
                logPostListing.logged = true;
            });
        }
    }

    connect(shopperId: number) {
        if (this.user === false || this.user === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (this.user instanceof Object && this.user.admin) {
            //do nothing
        }
        else if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not activated');
            this.modalService.open(ActivateWalletModalComponent);
        }
        else {
            this.router.navigate(['shopperconnect', shopperId]);
        }
    }
}