import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AdminShopperConnectionValueService } from "../admin/connectionvalues/AdminShopperConnectionValueService";
import { ShopperConnectionValue } from "../admin/connectionvalues/ShopperConnectionValue";
import { Shopper } from "../shopper/Shopper";
import { ShopperService } from "../shopper/ShopperService";
import { ShopperConnectionRequest } from "./ShopperConnectionRequest";
import { ShopperConnectionRequestService } from "./ShopperConnectionRequestService";

@Component({
    templateUrl: './ShopperConnectionRequestComponent.html'
})
export class ShopperConnectionRequestComponent implements OnInit {

    shopperId!: number;
    shopper!: Shopper;
    loggedInShopper!: Shopper;
    step = 1;
    shopperConnectionValues: ShopperConnectionValue[] = [];
    shopperConnectionValue!: ShopperConnectionValue;


    constructor(private activatedRoute: ActivatedRoute,
        private shopperService: ShopperService,
        private service: ShopperConnectionRequestService,
        private authenticationService: AuthenticationService,
        private adminShopperConnectionValueService: AdminShopperConnectionValueService,
        public configService:ConfigService
    ) {

    }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe((params: Params) => {
            this.shopperId = params['shopperId'];

            this.shopperService.get(this.shopperId).subscribe(shopper => this.shopper = shopper);

        });

        this.authenticationService.user.subscribe(user => this.loggedInShopper = <Shopper>user);

        this.adminShopperConnectionValueService.list().subscribe(response => this.shopperConnectionValues = response);


    }

    selectShopperConnectionValue(shopperConnectionValue: ShopperConnectionValue) {
        this.shopperConnectionValue = shopperConnectionValue;
        this.step++;
    }

    edit() {
        this.step--;
    }

    confirm() {
        let shopperConnectionRequest: ShopperConnectionRequest = {
            id: 0,
            requester: this.loggedInShopper,
            recipient: this.shopper,
            accepted: false,
            shopperConnectionValue: this.shopperConnectionValue
        }

        this.service.save(shopperConnectionRequest).subscribe(() => this.step++);
    }
}