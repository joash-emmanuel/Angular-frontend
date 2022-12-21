import { AfterViewChecked, AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { Shopper } from "../shopper/Shopper";
import { User } from "../user/User";

@Component({
    templateUrl: './InviteFriendsComponent.html'
})
export class InviteFriendsComponent implements OnInit {

    code!: string;
    shopper!: Shopper;
    step = 1;
    constructor(private authenticationService: AuthenticationService
        ,public configService:ConfigService) {

    }

    ngOnInit(): void {

        this.authenticationService.user.subscribe((user: User | null | boolean) => {
            if (user instanceof Object) {
                this.shopper = <Shopper>user;
                this.code = user.invitationCode;
            }
        });
    }

    nextStep() {
        this.step++;
    }


}