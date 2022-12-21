import { Component, OnInit } from "@angular/core";
import { WalletService } from "../../wallet/WalletService";
import { WalletTransactionType } from "../../wallet/WalletTransactionType";

@Component({
    templateUrl: "./AdminDashboardComponent.html"
})
export class AdminDashboardComponent implements OnInit {

    totalAvailableBalance: number = 0;
    totalCurrentBalance: number = 0;
    walletWithdrawals: number = 0;
    pledges: number = 0;
    paidPledges: number = 0;
    totalCareShoppers: number = 0;
    activeCareShoppers: number = 0;
    firstFees: number = 0;
    dueFees: number = 0;
    careDonations: number = 0;

    constructor(private walletService: WalletService) {

    }

    ngOnInit(): void {
        this.walletService.totalAvailableBalance()
            .subscribe(response => this.totalAvailableBalance = response);

        this.walletService.totalCurrentBalance()
            .subscribe(response => this.totalCurrentBalance = response);

        this.walletService.totalByType("WITHDRAWAL")
            .subscribe(response => this.walletWithdrawals = response);

        this.walletService.sumOfPledges()
            .subscribe(response => this.pledges = response);

        this.walletService.paidPledges()
            .subscribe(response => this.paidPledges = response);

        this.walletService.totalCareShoppers()
            .subscribe(response => this.totalCareShoppers = response);

        this.walletService.activeCareShoppers()
            .subscribe(response => this.activeCareShoppers = response);

        this.walletService.firstFees()
            .subscribe(response => this.firstFees = response);

        this.walletService.dueFees()
            .subscribe(response => this.dueFees = response);

        this.walletService.careDonations()
            .subscribe(response => this.careDonations = response);
    }
}