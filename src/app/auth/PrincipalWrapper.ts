import { Authority } from "./Authority";
import { Principal } from "./Principal";

export interface PrincipalWrapper{
    authenticated:boolean;
    authorities:Authority[];
    name:string;
    principal:Principal
}