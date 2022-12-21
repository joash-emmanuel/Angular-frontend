import { ShopperConnectionValue } from "../admin/connectionvalues/ShopperConnectionValue";
import { Shopper } from "../shopper/Shopper";

export interface ShopperConnection {
    id: number;
    requester: Shopper,
    recipient: Shopper,
    shopperConnectionValue: ShopperConnectionValue
}