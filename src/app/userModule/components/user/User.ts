export class User {
    id: number | null = null;
    firstName!: string;
    lastName!: string;
    email!: string;
    token!: string;
    dob!: string;
    profilePicUrl!: string;
    acceptedTermsAndConditions!: boolean;
    gender!: string;
    invitationCode!: string;
    walletActivated!: boolean;
    admin: boolean = false;
    password: string = "";
}