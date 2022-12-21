import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/config/ConfigService";
import { Shopper } from "../shopper/Shopper";
import { ShopperService } from "../shopper/ShopperService";

@Component({
    templateUrl: './MenuComponent.html',
    styleUrls: ['./MenuComponent.css'],
    selector: '[menu]'
})
export class MenuComponent implements OnInit {


    suggestedConnects: Shopper[] = [];

    constructor(private shopperService: ShopperService,public configService:ConfigService) {

    }

    ngOnInit() {
        this.shopperService.suggestedConnects().subscribe(response => this.suggestedConnects = response);
    }
}