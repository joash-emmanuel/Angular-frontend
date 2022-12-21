import { AfterViewInit, Component } from "@angular/core";
import { BrandConnection } from "./brandConnection/BrandConnection";
import { BrandConnectionService } from "./brandConnection/BrandConnectionService";
import { chunk, get } from 'lodash';
import { Brand } from "./Brand";
import { BrandService } from "./BrandService";
import { Shopper } from "../shopper/Shopper";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { User } from "../user/User";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivateWalletModalComponent } from "../wallet/activateWalletModal/ActivateWalletModalComponent";
import { AcceptInvitationLoginModalComponent } from "../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { ConfigService } from "src/app/config/ConfigService";
import { BrandConnectionLoaded } from "./brandConnection/BrandConnectionLoaded";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { BrandLoaded } from "./BrandLoaded";

@Component({
    templateUrl: "./BrandComponent.html"
})
export class BrandComponent implements AfterViewInit {

    active = 1;

    yourBrands: BrandConnectionLoaded[] = [];
    endorsedBrands: BrandLoaded[] = [];
    shopper!: Shopper | null;
    yourBrandsChunks!: BrandConnectionLoaded[][];
    endorsedBrandsChunks!: BrandLoaded[][];
    chunkSize: number = 4;

    constructor(private brandConnectionService: BrandConnectionService,
        private brandService: BrandService,
        private authenticationService: AuthenticationService,
        private modalService: NgbModal,
        private router: Router,
        public configService: ConfigService,
        private breakpointObserver: BreakpointObserver
    ) {

    }

    ngAfterViewInit(): void {
        this.brandConnectionService.yourBrands().subscribe(yourBrands => {
            this.yourBrands = yourBrands;

            this.brandService.endorsed(0, 1000).subscribe(endorsed => {

                let yourBrandsIds = yourBrands.map(yourBrand => yourBrand.brand.id);
                let filtered = endorsed.filter(value => !yourBrandsIds.includes(value.id));

                this.endorsedBrands = filtered;
                this.refreshChunks();
            });
        });

        this.authenticationService.user.subscribe(user => {
            console.log('at brand component user', user);
            if (user === null || user === false) {
                this.shopper = null;
            }
            else if (user instanceof Object) {
                this.shopper = <Shopper>user;
            }
        })

    }

    connect(brand: Brand) {

        if (this.shopper === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (!this.shopper?.walletActivated) {
            this.modalService.open(ActivateWalletModalComponent);

        }
        else if (this.shopper?.admin) {
            return;
        }
        else {
            this.router.navigate(['brandconnect', brand.id]);
        }
    }

    endorse() {
        if (this.shopper === null) {
            this.modalService.open(AcceptInvitationLoginModalComponent);
        }
        else if (!this.shopper?.walletActivated) {
            this.modalService.open(ActivateWalletModalComponent);

        }
        else if (this.shopper?.admin) {
            return;
        }
        else {
            this.router.navigate(['brand', 'endorse']);
        }
    }

    refreshChunks() {

        let breakPointChunkSizes =
        {
            "(min-width: 1200px)": 4,
            "(min-width: 992px) and (max-width: 1199px)": 4,
            "(min-width: 768px) and (max-width: 991px)": 3,
            "(min-width: 576px) and (max-width: 767px)": 2,
            "(max-width: 575px)": 2
        }
            ;

        // detect screen size changes
        this.breakpointObserver.observe([
            "(min-width: 1200px)",
            "(min-width: 992px) and (max-width: 1199px)",
            "(min-width: 768px) and (max-width: 991px)",
            "(min-width: 576px) and (max-width: 767px)",
            "(max-width: 575px)"

        ]).subscribe((result: BreakpointState) => {
            for (let breakpoint in result.breakpoints) {
                if (result.breakpoints[breakpoint] === true) {

                    this.chunkSize = get(breakPointChunkSizes, breakpoint);

                    this.yourBrandsChunks = chunk(this.yourBrands, this.chunkSize);
                    this.endorsedBrandsChunks = chunk(this.endorsedBrands, this.chunkSize);

                    console.log('breakpoint', breakpoint, 'chunkSize', this.chunkSize);
                }
            }
        });
    }

}