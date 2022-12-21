import { Component } from "@angular/core";
import { Card } from "../../pledge/Card";
import { WalletService } from "../WalletService";
import { TransferRequest } from "./TransferRequest";

@Component({
    templateUrl: './TransferComponent.html'
})
export class TransferComponent {

    step = 1;
    amount!: number;
    card: Card = {
        name: "",
        cardNumber: "",
        expiration: "",
        cvv: ""
    };
    otp!: string;

    constructor(private walletService: WalletService) {

    }


    nextStep() {
        this.step++;
    }


    transfer() {
        let transferRequest: TransferRequest = {
            amount: this.amount,
            card: this.card
        }
        this.walletService.transfer(transferRequest)
            .subscribe(() => {
                this.nextStep();
            });
    }

    verifyOTP() {
        this.walletService.verifyOtp({ otp: this.otp })
            .subscribe(() => {
                this.nextStep();
            });
    }
}