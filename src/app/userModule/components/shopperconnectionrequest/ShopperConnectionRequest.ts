import { ShopperConnectionValue } from "../admin/connectionvalues/ShopperConnectionValue";
import { Shopper } from "../shopper/Shopper";

export class ShopperConnectionRequest {
    id!: number;
    requester!: Shopper;
    recipient!: Shopper;
    shopperConnectionValue!: ShopperConnectionValue;
    accepted!: boolean;
}