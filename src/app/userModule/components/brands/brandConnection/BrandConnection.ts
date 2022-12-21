import { Shopper } from "../../shopper/Shopper";
import { Brand } from "../Brand";

export interface BrandConnection {
    id: number;
    shopper: Shopper;
    brand: Brand;
}