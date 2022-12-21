import { Log } from "./Log";
import { LogPost } from "./LogPost";

export interface LogPostListing {
    logPost: LogPost;
    chatCount: number;
    pledgeCount: number;
    pledgeAmount:number;
    repostCount: number;
    shareCount: number;
    logged: boolean;
    connected: boolean;
}