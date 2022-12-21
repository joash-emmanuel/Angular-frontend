import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { LogStory } from "./LogStory";
import { AdminLogStoryService } from "./AdminLogStoryService";

@Component({
    templateUrl: "./AdminLogStoryComponent.html"
})
export class AdminLogStoryComponent implements OnInit {


    logStories: LogStory[] = [];
    logStory!: LogStory;
    deleteLogStory!: LogStory;
    openModal!: NgbModalRef;


    constructor(private service: AdminLogStoryService, private modalService: NgbModal) {

    }

    ngOnInit(): void {
        this.service.list().subscribe(response => this.logStories = response);
    }

    edit(logStory: LogStory, formModal: any) {
        this.logStory = logStory;
        this.openModal = this.modalService.open(formModal);
    }

    add(formModal: any) {
        this.logStory = new LogStory();
        this.openModal = this.modalService.open(formModal);
    }

    submitForm() {
        this.service.save(this.logStory)
            .subscribe((response) => {
                this.logStory = response;
                this.openModal.close();
                this.service.list().subscribe(response => this.logStories = response);
            })
    }

    delete(deleteLogStory: LogStory, deleteModal: any) {
        this.deleteLogStory = deleteLogStory;
        this.openModal = this.modalService.open(deleteModal);
    }

    submitDelete() {
        this.service.delete(this.deleteLogStory.id)
            .subscribe(response => {
                this.openModal.close();
                this.service.list().subscribe(response => this.logStories = response);
            })
    }
}