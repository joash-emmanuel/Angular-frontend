import { parse } from "date-fns";

export class Shopper {

    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    dob!:string;
    token!: string;
    profilePicUrl!: string;
    acceptedTermsAndConditions!: boolean;
    gender!: string;
    invitationCode!: string;
    walletActivated!: boolean;
    admin: boolean = false;
    password!: string;
}