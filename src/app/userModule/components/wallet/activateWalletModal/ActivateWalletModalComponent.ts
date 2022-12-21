import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: "./ActivateWalletModalComponent.html"
})
export class ActivateWalletModalComponent {


    constructor(private router: Router, public activeModal: NgbActiveModal) {

    }

    activateWallet() {
        this.router.navigate(['wallet', 'activate']);
        this.activeModal.dismiss();
    }
}
