import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AdminBrandConnectionValueService } from "../../admin/connectionvalues/AdminBrandConnectionValueService";
import { BrandConnectionValue } from "../../admin/connectionvalues/BrandConnectionValue";
import { Shopper } from "../../shopper/Shopper";
import { Brand } from "../Brand";
import { BrandConnectionService } from "../brandConnection/BrandConnectionService";
import { BrandService } from "../BrandService";

@Component({
    templateUrl: './BrandConnectComponent.html'
})
export class BrandConnectComponent implements AfterViewInit {

    step = 1;
    brandId!: number;
    brand!: Brand;
    brandConnectionValues: BrandConnectionValue[] = [];

    brandConnectionValue!: BrandConnectionValue;

    shopper!: Shopper;

    constructor(private activatedRoute: ActivatedRoute,
        private adminBrandConnectionValueService: AdminBrandConnectionValueService,
        private brandService: BrandService,
        private brandConnectionService: BrandConnectionService,
        private authenticationService: AuthenticationService
        ,public configService:ConfigService
    ) {

    }

    ngAfterViewInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.brandId = params['brandId'];

            this.brandService.get(this.brandId).subscribe(response => this.brand = response);
        });

        this.adminBrandConnectionValueService.list().subscribe(response => this.brandConnectionValues = response);

        this.authenticationService.user.subscribe(user => {
            if (user) {
                this.shopper = <Shopper>user;
            }
        });
    }

    selectBrandConnectionValue(brandConnectionValue: BrandConnectionValue) {
        this.brandConnectionValue = brandConnectionValue;
        this.step++;
    }

    edit() {
        this.step--;
    }

    confirm() {

        this.brandConnectionService.save({
            brand: this.brand, shopper: this.shopper, id: 0
        }).subscribe(() => this.step++)
    }
}