import { AfterViewChecked, AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AcceptInvitationLoginModalComponent } from "../../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent";
import { Shopper } from "../../shopper/Shopper";
import { ActivateWalletModalComponent } from "../../wallet/activateWalletModal/ActivateWalletModalComponent";
import { Pledge } from "../Pledge";
import { PledgeService } from "../PledgeService";

@Component({
    templateUrl: './ListGiftersComponent.html'
})
export class ListGiftersComponent implements AfterViewInit {

    pledges: Pledge[] = [];
    total: number = 0;
    logId!: number;
    shopper!: Shopper;

    constructor(private activatedRoute: ActivatedRoute, private pledgeService: PledgeService,
        private router: Router,
        private authenticationService: AuthenticationService,
        private modalService: NgbModal,
        public configService:ConfigService
    ) {

    }

    ngAfterViewInit(): void {

        this.authenticationService.user.subscribe(user => {
            this.shopper = <Shopper>user;
        });

        this.activatedRoute.params.subscribe((params: Params) => {

            let logId = params['logId'];

            this.logId = logId;

            this.pledgeService.list(logId)
                .subscribe(response => this.pledges = response);

            this.pledgeService.total(logId)
                .subscribe(response => this.total = response);

        });

    }

    addGift() {

        if(!this.shopper){
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        if (this.shopper.admin) {
            return;
        }
        else if (!this.shopper.walletActivated) {
            this.modalService.open(ActivateWalletModalComponent);
        }
        else {
            this.router.navigate(['pledge', this.logId]);
        }
    }
}