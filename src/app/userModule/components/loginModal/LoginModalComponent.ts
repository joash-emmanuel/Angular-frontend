import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/auth/AuthenticationService";
import { LibHttp } from "src/app/lib/http/LibHttp";
import { User } from "../user/User";

@Component({
    templateUrl: "./LoginModalComponent.html",
    styleUrls: [],
    selector: "modal-login"
})
export class LoginModalComponent {

    loginForm = new FormGroup({
        loginEmail: new FormControl('', [Validators.required, Validators.email]),
        loginPassword: new FormControl('', [Validators.required])
    })

    showComponent = 'login';
    email = "";
    password = "";
    confirmPassword = "";
    forgotPasswordEmail = "";
    otp = "";

    constructor(public activeModal: NgbActiveModal, private authService: AuthenticationService,
        private libHttp: LibHttp
    ) {

    }

    get loginEmail() {
        return this.loginForm.get('loginEmail');
    }

    get loginPassword() {
        return this.loginForm.get('loginPassword');
    }

    submitForgotPassword() {
        this.libHttp.post('/shopper/forgotpassword', { email: this.forgotPasswordEmail })
            .subscribe(response => {
                this.showComponent = 'enterOTP';
            })
    }

    submitOTP() {
        this.libHttp.post("/shopper/verifytoken", { token: this.otp })
            .subscribe(response => {
                this.showComponent = 'enterNewPassword';
            })
    }

    submitNewPassword() {

        if (this.password !== this.confirmPassword) {
            return;
        }
        this.libHttp.post("/shopper/resetpassword", {
            token: this.otp,
            password: this.password,
            confirmPassword: this.confirmPassword
        }).subscribe(response => {
            this.showComponent = 'login';
        });
    }

    login() {

        const { loginEmail, loginPassword } = this.loginForm.value;

        if (!this.loginForm.valid || !loginPassword || !loginEmail) {
            this.loginEmail?.setErrors({ "required": true });
            this.loginEmail?.markAsTouched();
            this.loginPassword?.setErrors({ "required": true });
            this.loginPassword?.markAsTouched();
            return;
        }

        console.log(loginEmail, loginPassword);

        this.authService.login(loginEmail, loginPassword)
            .subscribe((result: User | boolean) => {
                if (result === false) {
                    console.log('login failed');
                    return;
                }

                if (result === null) {
                    console.log('result is null');
                    return;
                }

                console.log('result', result);
                this.activeModal.close();
                window.location.reload();

            });
    }
}