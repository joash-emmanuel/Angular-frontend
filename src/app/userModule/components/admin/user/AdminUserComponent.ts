import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AdminUser } from "./AdminUser";
import { AdminUserService } from "./AdminUserService";

@Component({
    templateUrl: "./AdminUserComponent.html"
})
export class AdminUserComponent implements OnInit {


    adminUsers: AdminUser[] = [];
    adminUser!: AdminUser;
    deleteAdminUser!: AdminUser;
    openModal!: NgbModalRef;


    constructor(private service: AdminUserService, private modalService: NgbModal) {

    }

    ngOnInit(): void {
        this.service.list().subscribe(response => this.adminUsers = response);
    }

    edit(adminUser: AdminUser, formModal: any) {
        this.adminUser = adminUser;
        this.openModal = this.modalService.open(formModal);
    }

    add(formModal: any) {
        this.adminUser = new AdminUser();
        this.openModal = this.modalService.open(formModal);
    }

    submitForm() {
        this.service.save(this.adminUser)
            .subscribe((response) => {
                this.adminUser = response;
                this.openModal.close();
                this.service.list().subscribe(response => this.adminUsers = response);
            })
    }

    delete(deleteAdminUser: AdminUser, deleteModal: any) {
        this.deleteAdminUser = deleteAdminUser;
        this.openModal = this.modalService.open(deleteModal);
    }

    submitDelete() {
        this.service.delete(this.deleteAdminUser.id)
            .subscribe(response => {
                this.openModal.close();
                this.service.list().subscribe(response => this.adminUsers = response);
            })
    }
}