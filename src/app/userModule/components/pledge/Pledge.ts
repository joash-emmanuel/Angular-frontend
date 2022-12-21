import { Log } from "../logs/Log";
import { Shopper } from "../shopper/Shopper";
import { PaymentPlan } from "../wallet/activate/PaymentPlan";
import { PledgeMode } from "./PledgeMode";
import { PledgeType } from "./PledgeType";

export interface Pledge {
    id: number;
    log: Log;
    shopper: Shopper;
    paymentPlan: PaymentPlan[];
    amount: number;
    cardName: string;
    carNumber: string;
    cardExpiration: string;
    cardCvv: string;
    otp: string;
    accepted: boolean;
    pledgeType: PledgeType;
    pledgeMode: PledgeMode;
}