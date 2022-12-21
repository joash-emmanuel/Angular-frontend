import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ShopperConnectionValue } from "./ShopperConnectionValue";
import { AdminShopperConnectionValueService } from "./AdminShopperConnectionValueService";
import { AdminBrandConnectionValueService } from "./AdminBrandConnectionValueService";
import { BrandConnectionValue } from "./BrandConnectionValue";

@Component({
    templateUrl: "./AdminConnectionValueComponent.html"
})
export class AdminConnectionValueComponent implements OnInit {


    shopperConnectionValues: ShopperConnectionValue[] = [];
    brandConnectionValues: BrandConnectionValue[] = [];
    shopperConnectionValue!: ShopperConnectionValue;
    brandConnectionValue!: BrandConnectionValue;
    shopperConnectionValueToDelete!: ShopperConnectionValue;
    brandConnectionValueToDelete!: BrandConnectionValue;
    openModal!: NgbModalRef;


    constructor(private adminShopperConnectionValueService: AdminShopperConnectionValueService, private modalService: NgbModal,
        private adminBrandConnectionValueService: AdminBrandConnectionValueService) {

    }

    ngOnInit(): void {
        this.adminShopperConnectionValueService.list().subscribe(response => this.shopperConnectionValues = response);
        this.adminBrandConnectionValueService.list().subscribe(response => this.brandConnectionValues = response);
    }

    editShopperConnectionValue(shopperConnectionValue: ShopperConnectionValue, formModal: any) {
        this.shopperConnectionValue = shopperConnectionValue;
        this.openModal = this.modalService.open(formModal);
    }

    editBrandConnectionValue(brandConnectionValue: BrandConnectionValue, formModal: any) {
        this.brandConnectionValue = brandConnectionValue;
        this.openModal = this.modalService.open(formModal);

    }

    addShopperConnectionValue(formModal: any) {
        this.shopperConnectionValue = new ShopperConnectionValue();
        this.openModal = this.modalService.open(formModal);
    }

    addBrandConnectionValue(formModal: any) {
        this.brandConnectionValue = new BrandConnectionValue();
        this.openModal = this.modalService.open(formModal);
    }

    submitShopperConnectionValueForm() {
        this.adminShopperConnectionValueService.save(this.shopperConnectionValue)
            .subscribe((response) => {
                this.shopperConnectionValue = response;
                this.openModal.close();
                this.adminShopperConnectionValueService.list().subscribe(response => this.shopperConnectionValues = response);
            })
    }

    submitBrandConnectionValueForm() {
        this.adminBrandConnectionValueService.save(this.brandConnectionValue)
            .subscribe((response) => {
                this.brandConnectionValue = response;
                this.openModal.close();
                this.adminBrandConnectionValueService.list().subscribe(response => this.brandConnectionValues = response);
            })
    }

    deleteShopperConnectionValue(deleteShopperConnectionValue: ShopperConnectionValue, deleteModal: any) {
        this.shopperConnectionValueToDelete = deleteShopperConnectionValue;
        this.openModal = this.modalService.open(deleteModal);
    }

    deleteBrandConnectionValue(deleteBrandConnectionValue: BrandConnectionValue, deleteModal: any) {
        this.brandConnectionValueToDelete = deleteBrandConnectionValue;
        this.openModal = this.modalService.open(deleteModal);
    }

    submitDeleteShopperConnectionValue() {
        this.adminShopperConnectionValueService.delete(this.shopperConnectionValueToDelete.id)
            .subscribe(response => {
                this.openModal.close();
                this.adminShopperConnectionValueService.list().subscribe(response => this.shopperConnectionValues = response);
            })
    }

    
    submitDeleteBrandConnectionValue() {
        this.adminBrandConnectionValueService.delete(this.brandConnectionValueToDelete.id)
            .subscribe(response => {
                this.openModal.close();
                this.adminBrandConnectionValueService.list().subscribe(response => this.brandConnectionValues = response);
            })
    }
}