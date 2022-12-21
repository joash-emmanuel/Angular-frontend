import { Log } from "../logs/Log";
import { PledgePaymentPlanRequest } from "./paymentPlan/PledgePaymentPlanRequest";
import { PledgeMode } from "./PledgeMode";
import { PledgeType } from "./PledgeType";

export interface PledgeRequest {
    log: Log;
    amount: number;
    pledgeMode: PledgeMode,
    pledgeType: PledgeType,
    pledgePaymentPlanRequest: PledgePaymentPlanRequest
    cardName: string;
    cardNumber: string;
    cardExpiration: string;
    cardCvv: string;
    otp: string;
}