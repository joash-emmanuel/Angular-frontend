import { Component, OnInit } from "@angular/core";
import { add, addDays, addYears, differenceInDays, format, isAfter, isBefore } from "date-fns";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { Shopper } from "../../shopper/Shopper";
import { ActivateWalletService } from "./ActivateWalletService";
import { CardDetailsRequest } from "./CardDetailsRequest";
import { PaymentPlan } from "./PaymentPlan";

@Component({
    templateUrl: "./ActivateWalletComponent.html"
})
export class ActivateWalletComponent implements OnInit {

    step = 1;
    paymentPlan!: PaymentPlan;
    cardDetailsRequest: CardDetailsRequest = {
        name: "",
        cardNumber: "",
        expirationDate: "",
        cvv: ""
    };

    phoneNumber: string = "";
    otp: string = "";
    dueDate: string = "";
    dueDateFormatted: string = "";
    noOfDays: number = 0;
    shopper!: Shopper;

    constructor(private service: ActivateWalletService, private authenticationService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.authenticationService.user.subscribe(user => {

            if (!user) {
                return;
            }

            this.shopper = <Shopper>user;

            let dob: Date = new Date(Date.parse(this.shopper.dob));

            console.log('dob', dob);

            let dateNow: Date = new Date();

            dob.setFullYear(dateNow.getFullYear());

            if (isAfter(dateNow, dob)) {
                dob = addYears(dob, 1);
            }

            console.log('dob', dob);

            this.dueDate = dob.toString();

            this.dueDateFormatted = format(dob, "do MMM yyyy");

        });

        this.service.noOfDays().subscribe(response => this.noOfDays = response);
    }

    selectPaymentPlan(paymentPlanName: string) {

        this.service.selectPaymentPlan(paymentPlanName)
            .subscribe(response => {
                console.log('payment plan', response);
                this.paymentPlan = response;
               
                let dueDate = response.dueDate.toString();
                this.paymentPlan.dueDate = new Date(Date.parse(dueDate));

                let startDate = response.startDate.toString();
                this.paymentPlan.startDate = new Date(Date.parse(startDate));
                this.step++;
            })
    }

    confirmPaymentPlan() {
        this.service.confirmPaymentPlan(this.paymentPlan)
            .subscribe(() => this.step++);
    }

    paymentMethod() {
        this.service.paymentMethod(this.cardDetailsRequest)
            .subscribe(response => {
                this.step++
            });
    }


    sendOTP() {
        this.service.sendOTP(this.phoneNumber)
            .subscribe();
    }

    edit() {
        this.step = 1;
    }

    verifyOTP() {
        this.service.verifyOTP(this.otp, this.phoneNumber)
            .subscribe((response) => {
                this.step++;

                this.authenticationService.refresh();
            })
    }

    nextStep() {
        this.step++;

    }

    formatDate(date: Date | undefined): string {

        console.log('formatting date ', date);
        if (!date) {
            return "";
        }
        return format(date, "do MMM yyyy");

    }

}