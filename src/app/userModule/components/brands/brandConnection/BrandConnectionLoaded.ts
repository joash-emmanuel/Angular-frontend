import { Shopper } from "../../shopper/Shopper";
import { Brand } from "../Brand";

export interface BrandConnectionLoaded {

    id: number;
    shopper: Shopper;
    brand: Brand;
    noOfConnects: number;
}