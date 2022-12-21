import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from "rxjs";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AcceptInvitationLoginModalComponent } from "../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent";
import { AcceptInvitationModalComponent } from "../acceptInvitationModal/AcceptInvitationModalComponent";
import { LoginModalComponent } from "../loginModal/LoginModalComponent";
import { Shopper } from "../shopper/Shopper";
import { ShopperService } from "../shopper/ShopperService";
import { User } from "../user/User";
import { ActivateWalletModalComponent } from "../wallet/activateWalletModal/ActivateWalletModalComponent";


@Component({
    templateUrl: "./HeaderComponent.html",
    selector: "brandlogs-header"
})
export class HeaderComponent implements AfterViewInit {

    private modalRef: NgbModalRef | null = null;

    loggedIn = false;
    user: User | undefined;

    dropDownActive: boolean = false;

    // @ViewChild("dropDown") dropDown: ElementRef;

    public model: any;

    formatter = (result: string) => result.toUpperCase();

    constructor(
        private modalService: NgbModal,
        private authenticationService: AuthenticationService,
        private router: Router,
        private shopperService: ShopperService,
        public configService: ConfigService
    ) {

    }

    shoppers: Shopper[] = [];

    search: OperatorFunction<string, readonly Shopper[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.shoppers.filter((v) => {

                    let terms = term.split(' ');
                    for (let token of terms) {
                        if (v.firstName && v.firstName.toLowerCase().indexOf(token.toLowerCase()) > -1) {
                            return true;
                        }
                        else if (v.lastName && v.lastName.toLowerCase().indexOf(token.toLowerCase()) > -1) {
                            return true;
                        }
                    }

                    return false;
                })
            )
        );


    ngAfterViewInit(): void {
        this.authenticationService.user.subscribe(user => {

            if (user === null) {
                this.user = undefined;
                this.loggedIn = false;
            }
            else if (user === false) {
                this.user = undefined;
                this.loggedIn = false;
            }
            else if (user instanceof Object) {
                console.log('logged in');
                this.loggedIn = true;
                this.user = user;
            }
        });

        this.shopperService.list().subscribe(response => this.shoppers = response);
    }

    searchSelectItem(event: any) {
        event.preventDefault()
    }

    /*
    @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {

        if (event.target != this.dropDown.nativeElement && this.dropDownActive === true) {
            this.dropDownActive = false;
        }
    }
    */

    toggleDropDown() {
        this.dropDownActive = !this.dropDownActive;
    }

    openLoginModal() {
        this.modalRef = this.modalService.open(LoginModalComponent);
    }

    closeModal() {
        this.modalRef?.close();
    }

    logout() {
        this.authenticationService.logout()
            .subscribe();
    }

    acceptInvitation() {
        this.modalRef = this.modalService.open(AcceptInvitationModalComponent);
    }

    inviteFriends() {
        if (!this.loggedIn) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (!this.user?.walletActivated) {
            this.modalService.open(ActivateWalletModalComponent);
        }
        else if (this.user.admin) {
            return;
        }
        else {
            this.router.navigate(['invitefriends'])
        }
    }
}