import { AfterViewInit, Component } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AcceptInvitationModalComponent } from "../acceptInvitationModal/AcceptInvitationModalComponent";
import { LoginModalComponent } from "../loginModal/LoginModalComponent";

@Component({
    templateUrl: "./AcceptInvitationLoginModalComponent.html"
})
export class AcceptInvitationLoginModalComponent implements AfterViewInit {


    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {

    }

    ngAfterViewInit(): void {

    }

    acceptInvitation() {
        this.modalService.dismissAll();

        this.modalService.open(AcceptInvitationModalComponent);
    }

    login() {
        this.modalService.dismissAll();

        this.modalService.open(LoginModalComponent);
    }
}