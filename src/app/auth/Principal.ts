import { Authority } from "./Authority";

export class Principal {
    username: string = "";
    authorities: Authority[] = [];
    accountNonExpired: boolean = false;
    accountNonLocked: boolean = false;
    credentialsNonExpired: boolean = false;
    enabled: boolean = false;
}