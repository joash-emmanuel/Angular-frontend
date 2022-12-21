import { AfterViewInit, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { combineLatestWith } from "rxjs";
import { ConfigService } from "src/app/config/ConfigService";
import { AdminBirthdayActivityService } from "../admin/birthdayActivity/AdminBirthdayActivityService";
import { BirthdayActivity } from "../admin/birthdayActivity/BirthdayActivity";
import { AdminShopperConnectionValueService } from "../admin/connectionvalues/AdminShopperConnectionValueService";
import { ShopperConnectionValue } from "../admin/connectionvalues/ShopperConnectionValue";
import { AdminLogStoryService } from "../admin/logstory/AdminLogStoryService";
import { LogStory } from "../admin/logstory/LogStory";
import { LoginModalComponent } from "../loginModal/LoginModalComponent";
import { Log } from "../logs/Log";
import { LogImage } from "../logs/LogImage";
import { LogImageService } from "../logs/LogImageService";
import { LogPost } from "../logs/LogPost";
import { LogPostService } from "../logs/LogPostService";
import { Shopper } from "../shopper/Shopper";
import { ShopperService } from "../shopper/ShopperService";
import { ShopperConnectionRequestService } from "../shopperconnectionrequest/ShopperConnectionRequestService";
import { WalletService } from "../wallet/WalletService";
import { AcceptInvitationService } from "./AcceptInvitationService";

@Component({
    templateUrl: "./AcceptInvitationModalComponent.html"
})
export class AcceptInvitationModalComponent implements AfterViewInit {

    codeVerificationForm = new FormGroup({
        verificationCode: new FormControl('', [Validators.required])
    });

    verifyEmailForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        otp: new FormControl('', [Validators.required])
    });

    shopperDetailsForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmedPassword: new FormControl('', [Validators.required])
    });

    errorMessage = "";
    code = "";
    step = 1;
    inviter!: Shopper;
    customLogStory: string = "";
    showCustomLogStory: boolean = false;
    passwordMismatch: boolean = false;
    shopperConnectionValues: ShopperConnectionValue[] = [];
    birthDate: string = "";// NgbDate = new NgbDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());

    shopper: Shopper = new Shopper();

    logStories: LogStory[] = [];

    thankInviterMessages: string[] = [
        "I appreciate your consideration",
        "Thank you for the invite",
        "Thank you for letting me in your log group can't wait!",
        "Girl, here we go! Thank you for accepting my request."
    ];

    constructor(private service: AcceptInvitationService,
        private shopperService: ShopperService,
        private adminLogStoryService: AdminLogStoryService,
        private logPostService: LogPostService,
        private adminShopperConnectionValueService: AdminShopperConnectionValueService,
        private adminBithdayActivityService: AdminBirthdayActivityService,
        private shopperConnectionRequestService: ShopperConnectionRequestService,
        private modalService: NgbModal,
        private logImageService: LogImageService,
        public configService: ConfigService,
        private walletService: WalletService,
        public activeModal: NgbActiveModal
    ) {

    }
    ngAfterViewInit(): void {
        this.adminLogStoryService.list().subscribe(list => this.logStories = list);
        this.adminShopperConnectionValueService.list().subscribe(list => this.shopperConnectionValues = list);
        this.adminBithdayActivityService.list().subscribe(list => this.birthdayActivities = list);
    }

    get verificationCode() {
        return this.codeVerificationForm.get('verificationCode');
    }

    get email() {
        return this.verifyEmailForm.get('email');
    }

    get firstName() {
        return this.shopperDetailsForm.get('firstName');
    }

    get lastName() {
        return this.shopperDetailsForm.get('lastName');
    }

    get gender() {
        return this.shopperDetailsForm.get('gender');
    }

    get password() {
        return this.shopperDetailsForm.get('password');
    }

    get confirmedPassword() {
        return this.shopperDetailsForm.get('confirmedPassword');
    }

    get otp() {
        return this.verifyEmailForm.get('otp');
    }

    nextStep() {
        this.step++;
    }

    verifyCode() {
        const { verificationCode } = this.codeVerificationForm.value;

        if (!this.codeVerificationForm.valid || !verificationCode) {
            this.verificationCode?.setErrors({ "required": true });
            this.verificationCode?.markAsTouched();
            return;
        }

        this.code = verificationCode;

        this.service.verifyCode(verificationCode)
            .subscribe((response: Shopper) => {
                this.step++;
                this.inviter = response;
            });
    }

    verifyEmail() {
        const { email, otp } = this.verifyEmailForm.value;

        if (!email) {
            this.email?.setErrors({ "required": true });
            this.email?.setErrors({ "email": true });
            this.email?.markAsTouched();
            return;
        }

        this.service.verifyEmail({ code: this.code, email: email })
            .subscribe(response => {
                this.step++;
            });
    }

    verifyOTP() {
        const { email, otp } = this.verifyEmailForm.value;

        if (!otp) {
            this.otp?.setErrors({ "required": true });
            this.otp?.markAllAsTouched();
            return;
        }

        this.service.verifyOTP({ code: this.code, email: email, otp: otp })
            .subscribe((response: Shopper) => {
                this.step++;
                this.shopper = response;
            });
    }

    saveBirthday() {
        console.log('birthdate ', this.birthDate);
        let dob = Date.parse(this.birthDate);
        let dbDate = new Date(dob);
        console.log("dbDate", dbDate);
        this.shopper.dob = dbDate.getFullYear() + "-" + (dbDate.getMonth() + 1) + "-" + dbDate.getDate(); //this.birthDate.year + "-" + this.birthDate.month + "-" + this.birthDate.day;
        console.log('shopper.dob', this.shopper.dob);
        this.shopperService.save(this.shopper).subscribe(response => {
            this.shopper = response;
            this.step++;
        });
    }

    logPost: LogPost = new LogPost();

    selectLogStory(logStory: LogStory) {

        let log: Log = new Log();
        log.shopper = this.shopper;

        let logPost: LogPost = new LogPost();
        logPost.text = logStory.text;
        logPost.log = log;

        this.logPostService.save(logPost)
            .subscribe(response => {
                this.logPost = response;
                this.step++;
            });
    }

    profilePicFileChange(event: any) {

        if (event.target.files.length > 0) {
            this.shopperService.uploadProfilePic(this.shopper.id, event.target.files[0])
                .subscribe(response => this.shopper = response)
        }
        this.step++;
    }

    customizeLogStory() {
        this.showCustomLogStory = true;
    }

    submitCustomLogStory() {
        let log: Log = new Log();
        log.shopper = this.shopper;

        let logPost: LogPost = new LogPost();
        logPost.text = this.customLogStory;
        logPost.log = log;

        this.logPostService.save(logPost)
            .subscribe(response => {
                this.logPost = response;
                this.step++;
            });
    }

    customThankYouMessage: string = "";
    selectThankInviterMessage(message: string) {
        this.service.saveThankYouMessage({
            sender: this.shopper,
            receiver: this.inviter,
            message: message
        })
            .subscribe(response => this.step++);
    }

    submitCustomThankYouMessage() {
        this.service.saveThankYouMessage({
            sender: this.shopper,
            receiver: this.inviter,
            message: this.customThankYouMessage
        })
            .subscribe(response => this.step++);
    }

    showCustomThankYouMessage: boolean = false;
    customizeThankYouMessage() {
        this.showCustomThankYouMessage = true;
    }

    selectConnectionValue(shopperConnectionValue: ShopperConnectionValue) {

        this.shopperConnectionRequestService.save({
            requester: this.shopper,
            recipient: this.inviter,
            shopperConnectionValue,
            id: 0,
            accepted: false
        }).subscribe(response => this.step++);

    }

    selectedBirthdayActivities: BirthdayActivity[] = [];
    birthdayActivities: BirthdayActivity[] = [];

    selectBirthdayActivity(event: any, birthdayActivity: BirthdayActivity) {
        console.log('event', event);
        event.target.disabled = true;
        this.logImageService.save({
            id: 0,
            url: birthdayActivity.imageUrl,
            logPost: this.logPost
        }).subscribe(response => {

            this.selectedBirthdayActivities.push(birthdayActivity);
            this.logPost.logImages.push(response);

            if (this.selectedBirthdayActivities.length === 3) {

                this.logPostService.save(this.logPost).subscribe(response => this.logPost = response);
                this.step++;
            }
        });


    }

    changeShopper() {
        this.shopperService.save(this.shopper).subscribe(response => this.shopper = response);
    }

    saveCredentials() {
        const { firstName, lastName, gender, password, confirmedPassword } = this.shopperDetailsForm.value;

        if (!this.shopperDetailsForm.valid || !firstName || !lastName || !password || !confirmedPassword || !gender) {
            this.firstName?.setErrors({ "required": true });
            this.lastName?.setErrors({ "required": true });
            this.password?.setErrors({ "required": true });
            this.confirmedPassword?.setErrors({ "required": true });
            this.gender?.setErrors({ "required": true });
            this.firstName?.markAsTouched();
            this.lastName?.markAsTouched();
            this.password?.markAsTouched();
            this.confirmedPassword?.markAsTouched();
            this.gender?.markAsTouched();
            return;
        }

        if (password != confirmedPassword) {
            this.passwordMismatch = true;
            return;
        }

        this.shopper.firstName = firstName;
        this.shopper.lastName = lastName;
        this.shopper.gender = gender;
        this.shopper.password = password;

        this.shopperService.save(this.shopper)
            .pipe(combineLatestWith(this.walletService.acceptInvitation(this.shopper.id)))
            .subscribe(response => {
                console.log('response', response);
            });

        this.modalService.dismissAll();

        this.modalService.open(LoginModalComponent);
    }
}