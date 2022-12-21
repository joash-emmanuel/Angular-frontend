import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ConfigService } from "src/app/config/ConfigService";
import { AdminBirthdayActivityService } from "./AdminBirthdayActivityService";
import { BirthdayActivity } from "./BirthdayActivity";

@Component({
    templateUrl: "./AdminBirthdayActivityComponent.html"
})
export class AdminBirthdayActivityComponent implements OnInit {


    birthdayActivities: BirthdayActivity[] = [];
    birthdayActivity!: BirthdayActivity;
    deleteBirthdayActivity!: BirthdayActivity;
    openModal!: NgbModalRef;
    file!: File | undefined;


    constructor(private service: AdminBirthdayActivityService, private modalService: NgbModal,
        public configService: ConfigService) {

    }

    ngOnInit(): void {
        this.service.list().subscribe(response => this.birthdayActivities = response);
    }

    edit(BirthdayActivity: BirthdayActivity, formModal: any) {
        this.birthdayActivity = BirthdayActivity;
        this.openModal = this.modalService.open(formModal);
    }

    add(formModal: any) {
        this.birthdayActivity = new BirthdayActivity();
        this.openModal = this.modalService.open(formModal);
    }

    submitForm() {
        this.service.save(this.birthdayActivity)
            .subscribe((response) => {
                this.birthdayActivity = response;
                this.openModal.close();

                if (this.file) {
                    this.service.uploadImage(this.birthdayActivity.id, this.file)
                        .subscribe(() => {
                            this.service.list().subscribe(response => this.birthdayActivities = response);
                            this.file = undefined;
                        })
                        ;
                }
                else {
                    this.service.list().subscribe(response => this.birthdayActivities = response);
                }
            })
    }

    delete(deleteBirthdayActivity: BirthdayActivity, deleteModal: any) {
        this.deleteBirthdayActivity = deleteBirthdayActivity;
        this.openModal = this.modalService.open(deleteModal);
    }

    submitDelete() {
        this.service.delete(this.deleteBirthdayActivity.id)
            .subscribe(response => {
                this.openModal.close();
                this.service.list().subscribe(response => this.birthdayActivities = response);
            })
    }

    imageFileInputChange(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }
}