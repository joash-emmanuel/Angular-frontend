import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Log } from "../logs/Log";
import { LogService } from "../logs/LogService";
import { PledgePaymentPlanRequest } from "./paymentPlan/PledgePaymentPlanRequest";
import { PledgeService } from "./PledgeService";

import differenceInDays from "date-fns/differenceInDays";
import { Card } from "./Card";
import { Pledge } from "./Pledge";
import { Shopper } from "../shopper/Shopper";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { PledgeRequest } from "./PledgeRequest";
import { PledgeMode } from "./PledgeMode";
import { PledgeType } from "./PledgeType";
import { format, isBefore, parse } from "date-fns";

@Component({
    templateUrl: './PledgeComponent.html'
})
export class PledgeComponent implements AfterViewInit {

    step = 1;
    amount!: number;
    pledgePaymentPlanRequest!: PledgePaymentPlanRequest;
    pledgePaymentPlanRequests: PledgePaymentPlanRequest[] = [];
    logId!: number;
    log!: Log;
    daysRemaining!: number;
    pledgeMode!: PledgeMode;
    pledgeType!: PledgeType;
    otp!: string;
    shopper!: Shopper;

    card: Card = {
        name: "",
        cvv: "",
        expiration: "",
        cardNumber: ""
    };


    constructor(
        private service: PledgeService,
        private activatedRoute: ActivatedRoute,
        private logService: LogService,
        private authenticationService: AuthenticationService
    ) {

    }

    ngAfterViewInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.logId = params['logId'];

            this.authenticationService.user.subscribe(user => this.shopper = <Shopper>user);

            this.logService.get(this.logId)
                .subscribe(response => {
                    this.log = response;

                    console.log('this.log.shopper.dob', this.log.shopper.dob)
                    let dobThisYear = parse(this.log.shopper.dob, 'yyyy-MM-dd', new Date());
                    console.log('dobThisyear', dobThisYear);

                    dobThisYear.setFullYear(new Date().getFullYear());

                    console.log('dobThisYear 1 ', dobThisYear);

                    let now = new Date();

                    if (now > dobThisYear) {
                        dobThisYear.setFullYear(now.getFullYear() + 1);
                    }

                    console.log('dobThisYear 2 ', dobThisYear);

                    this.daysRemaining = differenceInDays(dobThisYear, now);

                    console.log('daysRemaining', this.daysRemaining);

                });
        });
    }

    selectPledgeAmount(amount: number) {
        this.amount = amount;

        this.pledgePaymentPlanRequests = [];

        let eventDate = parse(this.log.shopper.dob, 'yyyy-MM-dd', new Date());

        console.log('eventDate', eventDate);

        let now = new Date();

        let thisYear = now.getFullYear();
        let eventYear = eventDate.getFullYear();

        if (eventYear <= thisYear) {
            eventDate.setFullYear(thisYear);

            if (isBefore(eventDate, now)) {
                eventDate.setFullYear(thisYear + 1);
            }
        }

        console.log('eventDate', eventDate);


        this.pledgePaymentPlanRequests.push(new PledgePaymentPlanRequest(amount, 'Daily', eventDate));
        this.pledgePaymentPlanRequests.push(new PledgePaymentPlanRequest(amount, 'Weekly', eventDate));
        this.pledgePaymentPlanRequests.push(new PledgePaymentPlanRequest(amount, 'Monthly', eventDate));
        this.pledgePaymentPlanRequests.push(new PledgePaymentPlanRequest(amount, 'Pay in full', eventDate));

        this.step++;
    }

    selectPledgeMode(pledgeMode: string) {
        if (pledgeMode === 'PRIVATE') {
            this.pledgeMode = PledgeMode.PRIVATE
        }
        else if (pledgeMode === 'PUBLIC') {
            this.pledgeMode = PledgeMode.PUBLIC;
        }
        this.step++;
    }

    selectPledgeType(pledgeType: string) {
        if (pledgeType === 'ONEWAY') {
            this.pledgeType = PledgeType.ONEWAY
        }
        else if (pledgeType === 'TWOWAY') {
            this.pledgeType = PledgeType.TWOWAY
        }
        this.step++;
    }

    selectPledgePaymentPlanRequest(pledgePaymentPlan: PledgePaymentPlanRequest) {
        this.pledgePaymentPlanRequest = pledgePaymentPlan;

        this.step++;
    }

    editPaymentPlan() {
        this.step--;
    }

    setCard(nextStep: boolean) {
        this.service.otp().subscribe(() => {
            if (nextStep) {
                this.step++;
            }
        });
    }

    nextStep() {
        this.step++;
    }

    confirm() {

        let pledgeRequest: PledgeRequest = {
            log: this.log,
            amount: this.amount,
            pledgeMode: this.pledgeMode,
            pledgeType: this.pledgeType,
            pledgePaymentPlanRequest: this.pledgePaymentPlanRequest,
            cardName: this.card.name,
            cardNumber: this.card.cardNumber,
            cardExpiration: this.card.expiration,
            cardCvv: this.card.cvv,
            otp: this.otp
        };

        this.service.request(pledgeRequest).subscribe(pledge => {
            this.step++;
        });
    }

    
    formatDate(date: Date | undefined): string {

        console.log('formatting date ', date);
        if (!date) {
            return "";
        }
        return format(date, "do MMM yyyy");

    }




}