import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import TimeAgo from "javascript-time-ago";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { Log } from "../logs/Log";
import { LogService } from "../logs/LogService";
import { Shopper } from "../shopper/Shopper";
import { Chat } from "./Chat";
import { ChatService } from "./ChatService";

const timeAgo = new TimeAgo('en-US');

@Component(
    {
        templateUrl: './ChatComponent.html'
    }
)
export class ChatComponent implements AfterViewInit {

    logId!: number;
    log!: Log;
    preChats: Chat[] = [];
    liveChats: Chat[] = [];
    postChats: Chat[] = [];
    text!: string;
    shopper!: Shopper;
    parent!: Chat | undefined;
    active = 1;

    constructor(private activatedRoute: ActivatedRoute,
        private chatService: ChatService,
        private logService: LogService,
        private authenticationService: AuthenticationService,
        private service: ChatService
        ,public configService:ConfigService
    ) {

    }

    ngAfterViewInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.logId = params['logId'];

            this.logService.get(this.logId).subscribe(response => this.log = response);

            this.refresh();

        });

        this.authenticationService.user.subscribe(user => {
            if (user instanceof Object) {
                this.shopper = <Shopper>user;
            }
        });
    }

    refresh() {

        this.chatService.list(this.logId, "pre")
            .subscribe(response => this.preChats = response);
        this.chatService.list(this.logId, "live")
            .subscribe(response => this.liveChats = response);
        this.chatService.list(this.logId, "post")
            .subscribe(response => this.postChats = response);
    }

    send() {

        if(this.shopper.admin){
            return;
        }
        let chat: Chat = {
            id: 0,
            text: this.text,
            sender: this.shopper,
            log: this.log,
            parent: this.parent,
            created: new Date()
        };

        this.service.send(chat).subscribe(() => {
            this.refresh();
            this.parent = undefined;
            this.text = "";
        });
    }

    chatBack(chat: Chat) {
        this.parent = chat;
    }

    timeAgo(date: any): string {

        if (!date) {
            return "";
        }
        
        return timeAgo.format(Date.parse(date))
    }

}