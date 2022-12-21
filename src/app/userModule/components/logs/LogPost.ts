import { Log } from "./Log";
import { LogImage } from "./LogImage";

export class LogPost {
    id!: number;
    log: Log = new Log();
    logImages: LogImage[] = [];
    logged: boolean = false;
    text: string = "";
}