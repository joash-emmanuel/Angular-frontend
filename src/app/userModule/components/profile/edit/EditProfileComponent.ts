import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { Shopper } from "../../shopper/Shopper";
import { ShopperService } from "../../shopper/ShopperService";

@Component(
    {
        templateUrl: './EditProfileComponent.html'
    }
)
export class EditProfileComponent implements OnInit {

    shopper!: Shopper;
    newFile: File | undefined = undefined;

    constructor(
        private authenticationService: AuthenticationService,
        public configService: ConfigService,
        public shopperService: ShopperService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

        this.authenticationService.user.subscribe(user => this.shopper = <Shopper>user);
    }

    save() {
        if (this.newFile) {
            this.shopperService.uploadProfilePic(this.shopper.id, this.newFile)
                .subscribe(response => {
                    this.shopper.profilePicUrl = response.profilePicUrl;

                    this.newFile = undefined;

                    this.shopperService.save(this.shopper).subscribe(response => {
                        this.shopper = response;

                        this.router.navigate(['profile', 'profile']);

                    });

                });
        }
        else {
            this.shopperService.save(this.shopper).subscribe(response => {
                this.shopper = response;
                this.router.navigate(['profile', 'profile']);
            });
        }


    }

    profilePicInputChange(event: any) {

        let file: File = event.target.files[0];
        this.fileToBase64String(file).subscribe(response => {
            this.shopper.profilePicUrl = response;
            console.log(
                this.shopper.profilePicUrl.substring(0, 4));
        });
        this.newFile = file;
    }

    fileToBase64String(file: File): Observable<string> {

        return new Observable<string>(observer => {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                observer.next(reader.result?.toString());
            };
            reader.onerror = function (error) {
                console.error("error converting image to base 64", error);
            };

        });

    }


}