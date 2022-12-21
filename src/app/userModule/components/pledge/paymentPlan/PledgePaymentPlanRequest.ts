import { Pledge } from "../Pledge";
import addDays from 'date-fns/addDays';
import { add, differenceInCalendarDays, differenceInHours, differenceInMonths, differenceInWeeks, isBefore } from "date-fns";

export class PledgePaymentPlanRequest {

    amount!: number;

    startDate!: Date;
    pledgePaymentPlanName!: string;
    payNowAmount: number = 1;
    eventDate!: Date;
    amountRegular!: string;

    constructor(amount: number, pledgePaymentPlanName: string, eventDate: Date) {
        this.amount = amount;
        this.pledgePaymentPlanName = pledgePaymentPlanName;

        this.eventDate = eventDate;
        this.amountRegular = this.getAmountRegular();
        this.startDate = this.getStartDate();

    }

    getStartDate() {
        switch (this.pledgePaymentPlanName) {
            case "Daily":
                return addDays(new Date(), 1);
            case "Weekly":
                return addDays(new Date(), 7);
            case "Monthly":
                return addDays(new Date(), 30);
            case "Pay in full":
                return new Date();
            default:
                return new Date();
        }
    }

    getAmountRegular(): string {
        let amountRegular;
        console.log('paymentplan ', this.pledgePaymentPlanName);

        let now: Date = new Date();

        switch (this.pledgePaymentPlanName) {
            case "Daily":

                let noOfDays = differenceInHours(this.eventDate, now) / 24;
                console.log('noOfDays', noOfDays);
                amountRegular = (this.amount - this.payNowAmount) / noOfDays;
                break;
            case "Weekly":
                let noOfWeeks = Math.floor(differenceInHours(this.eventDate, now) / (7 * 24)) | 0;
                console.log('noOfWeeks', noOfWeeks);
                amountRegular = (this.amount - this.payNowAmount) / noOfWeeks;
                break;
            case "Monthly":
                let noOfMonths = differenceInMonths(this.eventDate, now);
                console.log('noOfMonths', noOfMonths);
                amountRegular = (this.amount - this.payNowAmount) / noOfMonths;
                break;
            case "Pay in full":
                amountRegular = this.amount;
                this.payNowAmount = this.amount;
                break;
            default:
                amountRegular = (this.amount - this.payNowAmount);
        }

        console.log('amountRegular', amountRegular);

        return amountRegular.toFixed(2);

    }
}