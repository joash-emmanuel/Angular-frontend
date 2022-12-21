export interface ShopperLoaded{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob:string;
    token: string;
    profilePicUrl: string;
    acceptedTermsAndConditions: boolean;
    gender: string;
    invitationCode: string;
    walletActivated: boolean;
    admin: boolean;
    password: string;
    noOfConnects:number;
}