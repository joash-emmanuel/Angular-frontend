import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataTableResponse } from "src/app/lib/datatable/DataTableResponse";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { TransferRequest } from "./transfer/TransferRequest";
import { VerifyWalletOTPRequest } from "./VerifyWalletOTPRequest";
import { Balance } from "./wallet/Balance";
import { WalletTransaction } from "./WalletTransaction";
import { WalletTransactionType } from "./WalletTransactionType";

@Injectable()
export class WalletService {


    constructor(private libHttp: LibHttp) {

    }

    balance(): Observable<Balance> {
        return this.libHttp.get("/wallet/balance");
    }

    itemized(pageSize: number, pageIndex: number): Observable<WalletTransaction[]> {

        return new Observable(observer => {

            this.libHttp.post("/wallet/itemized", { pageIndex, pageSize })
                .subscribe((response: DataTableResponse<WalletTransaction>) => {
                    observer.next(response.content);
                });
        });
    }

    acceptInvitation(shopperId: number): Observable<void> {

        return this.libHttp.post("/wallet/acceptinvitation/" + shopperId, {});
    }

    transfer(transferRequest: TransferRequest): Observable<void> {
        return this.libHttp.post("/wallet/transfer", transferRequest);
    }

    verifyOtp(verifyWalletOTPRequest: VerifyWalletOTPRequest): Observable<void> {
        return this.libHttp.post("/wallet/verifyotp", verifyWalletOTPRequest);
    }

    totalAvailableBalance(): Observable<number> {
        return this.libHttp.get("/wallet/totalavailablebalance");
    }

    totalCurrentBalance(): Observable<number> {
        return this.libHttp.get("/wallet/totalcurrentbalance");
    }

    totalByType(type: string): Observable<number> {
        return this.libHttp.get("/wallet/totalbytype/" + type.toString());
    }

    sumOfPledges(): Observable<number> {
        return this.libHttp.get("/wallet/sumofpledges");
    }

    careDonations(): Observable<number> {
        return of(0);
    }

    dueFees(): Observable<number> {
        return this.libHttp.get("/wallet/duefees");
    }
    firstFees(): Observable<number> {
        return this.libHttp.get("/wallet/firstfees");
    }
    activeCareShoppers(): Observable<number> {
        return this.libHttp.get("/shopper/activecareshoppers");
    }
    totalCareShoppers(): Observable<number> {
        return this.libHttp.get("/shopper/total");
    }
    paidPledges(): Observable<number> {
        return this.libHttp.get("/wallet/paidpledges");
    }
}