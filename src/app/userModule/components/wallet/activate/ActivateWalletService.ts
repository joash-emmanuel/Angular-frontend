import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { CardDetailsRequest } from "./CardDetailsRequest";
import { PaymentPlan } from "./PaymentPlan";

@Injectable()
export class ActivateWalletService {

    constructor(private libHttp: LibHttp) {

    }

    noOfDays():Observable<number>{
        return this.libHttp.get("/createwallet/noofdays");
    }

    selectPaymentPlan(paymentPlanName: string): Observable<PaymentPlan> {
        return this.libHttp.get("/createwallet/selectpaymentplan/" + paymentPlanName);
    }

    paymentMethod(cardDetailsRequest: CardDetailsRequest): Observable<any> {
        return this.libHttp.post("/createwallet/paymentmethod", cardDetailsRequest);
    }

    sendOTP(phoneNumber: string): Observable<any> {
        return this.libHttp.post("/createwallet/verifyphonenumber", { phoneNumber });
    }

    verifyOTP(otp: string, phoneNumber: string): Observable<any> {
        return this.libHttp.post("/createwallet/verifyotp", {
            phoneNumber, otp
        });
    }

    confirmPaymentPlan(paymentPlan: PaymentPlan) {
        return this.libHttp.post("/createwallet/confirmpaymentplan", paymentPlan);
    }
}