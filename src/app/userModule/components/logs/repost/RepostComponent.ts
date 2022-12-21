import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { ConfigService } from "src/app/config/ConfigService";
import { AdminLogStoryService } from "../../admin/logstory/AdminLogStoryService";
import { LogStory } from "../../admin/logstory/LogStory";
import { Shopper } from "../../shopper/Shopper";
import { Log } from "../Log";
import { LogPost } from "../LogPost";
import { LogPostListing } from "../LogPostListing";
import { LogPostService } from "../LogPostService";
import { LogService } from "../LogService";

@Component({
    templateUrl: './RepostComponent.html'
})
export class RepostComponent implements OnInit {

    logPostId!: number;
    logPost!: LogPost;
    logPostListing!: LogPostListing;
    step = 1;
    images: File[] = [];
    imageBase64Strings: string[] = [];
    logStory!: string;
    customLogStoryVisible = false;
    customLogStoryText = "";
    logStories: LogStory[] = [];
    shopper!: Shopper;

    constructor(
        private activatedRoute: ActivatedRoute,
        private logService: LogService,
        private adminLogStoryService: AdminLogStoryService,
        private authenticationService: AuthenticationService,
        private logPostService: LogPostService,
        public configService: ConfigService
    ) {

    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.logPostId = params['logPostId'];

            this.logPostService.get(this.logPostId).subscribe(logPost => {

                this.logPost = logPost;
            });

            this.logPostService.single(this.logPostId).subscribe(response => this.logPostListing = response);
        });

        this.adminLogStoryService.list().subscribe(logStories => this.logStories = logStories);

        this.authenticationService.user.subscribe(user => this.shopper = <Shopper>user);
    }

    toggleCustomLogStory() {
        this.customLogStoryVisible = !this.customLogStoryVisible;
    }

    confirmCustomLogStory() {
        this.logStory = this.customLogStoryText;
        this.nextStep();
    }

    selectLogStory(logStory: LogStory) {
        this.logStory = logStory.text;
        this.nextStep();
    }

    fileInputChange(event: any) {
        if (this.images.length > 10 || (this.images.length + event.target.files.length) > 10) {
            return;
        }

        for (let file of event.target.files) {
            this.images.push(file);
            this.fileToBase64String(file).subscribe(base64String => this.imageBase64Strings.push(base64String));
        }
    }

    fileToBase64String(file: File): Observable<string> {

        return new Observable<string>(observer => {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                observer.next(reader.result?.toString());
            };
            reader.onerror = function (error) {

                observer.next("");
            };

        });

    }

    nextStep() {
        this.step++;
    }

    edit() {
        this.step = 1;
    }

    post() {
        let logPost: LogPost = {
            id: 0,
            log: this.logPost.log,
            logged: false,
            logImages: [],
            text: this.logStory
        }

        this.logPostService.save(logPost).subscribe(response => {

            for (let image of this.images) {
                this.logPostService.uploadImage(response.id, image)
                    .subscribe();
            }

            this.step++;
        })
    }

}