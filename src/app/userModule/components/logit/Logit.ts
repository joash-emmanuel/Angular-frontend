import { Shopper } from '../shopper/Shopper';
import { Log } from '../logs/Log';
export interface Logit {
    id: number;
    log: Log;
    shopper: Shopper;
}