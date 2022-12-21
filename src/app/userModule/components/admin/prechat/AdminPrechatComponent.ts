import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Prechat } from "./Prechat";
import { AdminPrechatService } from "./AdminPrechatService";

@Component({
    templateUrl: "./AdminPrechatComponent.html"
})
export class AdminPrechatComponent implements OnInit {


    prechats: Prechat[] = [];
    prechat!: Prechat;
    deletePrechat!: Prechat;
    openModal!: NgbModalRef;


    constructor(private service: AdminPrechatService, private modalService: NgbModal) {

    }

    ngOnInit(): void {
        this.service.list().subscribe(response => this.prechats = response);
    }

    edit(prechat: Prechat, formModal: any) {
        this.prechat = prechat;
        this.openModal = this.modalService.open(formModal);
    }

    add(formModal: any) {
        this.prechat = new Prechat();
        this.openModal = this.modalService.open(formModal);
    }

    submitForm() {
        this.service.save(this.prechat)
            .subscribe((response) => {
                this.prechat = response;
                this.openModal.close();
                this.service.list().subscribe(response => this.prechats = response);
            })
    }

    delete(deletePrechat: Prechat, deleteModal: any) {
        this.deletePrechat = deletePrechat;
        this.openModal = this.modalService.open(deleteModal);
    }

    submitDelete() {
        this.service.delete(this.deletePrechat.id)
            .subscribe(response => {
                this.openModal.close();
                this.service.list().subscribe(response => this.prechats = response);
            })
    }
}