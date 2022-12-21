import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { AcceptInvitationLoginModalComponent } from "../../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent";
import { AcceptInvitationModalComponent } from "../../acceptInvitationModal/AcceptInvitationModalComponent";
import { LoginModalComponent } from "../../loginModal/LoginModalComponent";
import { User } from "../../user/User";
import { ActivateWalletModalComponent } from "../activateWalletModal/ActivateWalletModalComponent";
import { WalletService } from "../WalletService";
import { Balance } from "./Balance";

@Component(
    {
        templateUrl: './WalletComponent.html'
    }
)
export class WalletComponent implements AfterViewInit {

    balance: Balance = { available: 0, current: 0 };

    user: User | boolean | null = null;

    constructor(private service: WalletService, private authenticationService: AuthenticationService,
        private modalService: NgbModal,
        private router: Router
    ) {

    }


    ngAfterViewInit(): void {
        this.authenticationService.user.subscribe(user => this.user = user);
        this.service.balance().subscribe(balance => {
            if (!balance.available) {
                balance.available = 0;
            }
            if (!balance.current) {
                balance.current = 0;
            }
            this.balance = balance
        }
        );
    }

    walletActivated(url: string[]) {
        if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not acctivated');
            this.modalService.open(ActivateWalletModalComponent);
        } else if (this.user instanceof Object && this.user.walletActivated) {
            console.log('navigating');
            this.router.navigate(url);
        }
    }

    transferBalance(url: string[]) {
        if (this.user instanceof Object && !this.user.walletActivated) {
            console.log('wallet not acctivated');
            this.modalService.open(ActivateWalletModalComponent);
        }
        else if (this.user instanceof Object && this.user.admin) {
            //do nothing

        } else if (this.user instanceof Object && this.user.walletActivated) {
            console.log('navigating');
            this.router.navigate(url);
        }
    }

    acceptInvitation() {
        this.modalService.open(AcceptInvitationModalComponent);
    }

    login() {
        this.modalService.open(LoginModalComponent);
    }



}