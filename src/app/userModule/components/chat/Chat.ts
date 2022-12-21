import { Log } from "../logs/Log";
import { Shopper } from "../shopper/Shopper";

export interface Chat {
    id: number;
    text: string;
    sender: Shopper;
    created: Date;
    log: Log;
    parent: Chat|undefined
}