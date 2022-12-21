import { Shopper } from "../shopper/Shopper";
import { WalletTransactionStatus } from "./WalletTransactionStatus";
import { WalletTransactionType } from "./WalletTransactionType";

export interface WalletTransaction {
    id: number;
    type: WalletTransactionType;
    status: WalletTransactionStatus;
    shopper: Shopper;
    sender:Shopper;
    amount: number;
    created: Date;
    currentDate: Date;
    availableDate: Date;

}