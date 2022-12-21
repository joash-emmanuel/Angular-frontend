import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ShareService } from "./ShareService";

@Component({
    templateUrl: './ShareComponent.html'
})
export class ShareComponent implements AfterViewInit {

    logPostId!: number;
    constructor(private activatedRoute: ActivatedRoute,
        private service: ShareService) {

    }

    ngAfterViewInit(): void {

        this.activatedRoute.params.subscribe((params: Params) => {
            this.logPostId = params['logPostId'];
        });
    }

    shareWhatsapp() {
        this.service.shareWhatsapp(this.logPostId).subscribe();
    }


}