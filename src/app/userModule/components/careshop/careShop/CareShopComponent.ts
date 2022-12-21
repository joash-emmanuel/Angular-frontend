import { Component } from "@angular/core";
import { IndexService } from "../../index/IndexService";

@Component(
    {
        templateUrl: './CareShopComponent.html'
    }
)
export class CareShopComponent {

    isBrand = false;
    constructor(public indexService: IndexService) {

    }
}