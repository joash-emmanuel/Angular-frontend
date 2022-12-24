import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './userModule/UserModule';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './loginModule/LoginModule';
import { FormsModule } from '@angular/forms';
import { ConfigService } from './config/ConfigService';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './auth/AuthenticationService';
import { LibHttp } from './lib/http/LibHttp';
import { LibHttpXsrfInterceptor } from './lib/http/LibHttpXsrfInterceptor';
import { AuthGuard } from './auth/AuthGuard';
import { CommonModule } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";
import { LoginResponseI } from './auth/Principal';
import { HotToastModule } from '@ngneat/hot-toast';

export function tokenGetter() {
  const userData: LoginResponseI = JSON.parse(sessionStorage.getItem("userData")!);
  return userData.access_token;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UserModule,
    LoginModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://Backend-LB-1653441132.us-west-1.elb.amazonaws.com"],
        disallowedRoutes: [],
      },
    }),
    HotToastModule.forRoot(),
  ],
  providers: [
    ConfigService,
    AuthenticationService,
    HttpClient,
    LibHttp,
    { provide: HTTP_INTERCEPTORS, useClass: LibHttpXsrfInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
