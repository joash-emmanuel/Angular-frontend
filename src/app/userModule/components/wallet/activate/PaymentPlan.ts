export interface PaymentPlan {
    dueDate: Date;
    totalAmount: number;
    name: string;
    amountNow: number;
    startDate: Date;
    amountRegular: number;
    noOfDays: number;
    noOfWeeks: number;
}