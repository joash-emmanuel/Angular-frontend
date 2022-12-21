import { AfterViewInit, Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AdminBrandConnectionValueService } from "../../admin/connectionvalues/AdminBrandConnectionValueService";
import { BrandConnectionValue } from "../../admin/connectionvalues/BrandConnectionValue";
import { Shopper } from "../../shopper/Shopper";
import { Brand } from "../Brand";
import { BrandConnectionService } from "../brandConnection/BrandConnectionService";
import { BrandService } from "../BrandService";

@Component({
    templateUrl: './EndorseBrandComponent.html'
})
export class EndorseBrandComponent implements AfterViewInit {

    step = 1;
    name!: string;
    image!: File;
    imageBase64!: string;
    brandConnectionValues: BrandConnectionValue[] = [];
    brandConnectionValue!: BrandConnectionValue;
    shopper!: Shopper;

    constructor(private brandService: BrandService,
        private adminBrandConnectionValueService: AdminBrandConnectionValueService,
        private brandConnectionService: BrandConnectionService,
        private authenticationService: AuthenticationService
        ,public configService:ConfigService
    ) {

    }

    ngAfterViewInit(): void {
        this.adminBrandConnectionValueService.list().subscribe(response => this.brandConnectionValues = response);
        this.authenticationService.user.subscribe(user => this.shopper = <Shopper>user);
    }

    nextStep() {
        this.step++;
    }

    pictureChange(event: any) {
        this.image = event.target.files[0];

        this.fileToBase64String(event.target.files[0]).subscribe(base64String => this.imageBase64 = base64String);
    }

    setBrandConnectionValue(brandConnectionValue: BrandConnectionValue) {
        this.brandConnectionValue = brandConnectionValue;
        this.step++;
    }

    fileToBase64String(file: File): Observable<string> {

        return new Observable<string>(observer => {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                observer.next(reader.result?.toString());
            };
            reader.onerror = function (error) {

                observer.next("");
            };

        });

    }

    edit() {
        this.step = 2;
    }

    confirm() {

        this.brandService.save({
            id: 0,
            name: this.name,
            logoUrl: ""

        }).subscribe(brand => {

            this.brandService.uploadImage(brand.id, this.image)
                .subscribe();

            this.brandConnectionService.save({
                shopper: this.shopper,
                brand,
                id: 0
            }).subscribe();


        });

        this.step++;
    }

}