import { Log } from "../logs/Log";
import { LogPost } from "../logs/LogPost";
import { Pledge } from "../pledge/Pledge";
import { Shopper } from "../shopper/Shopper";
import { ShopperConnectionRequest } from "../shopperconnectionrequest/ShopperConnectionRequest";
import { NotificationType } from "./NotificationType";

export interface Notification {
    id: number;
    type: NotificationType;
    logPost: LogPost;
    pledge: Pledge;
    connectionRequest: ShopperConnectionRequest;
    message: string;
    shopper: Shopper;
    created: Date;
}