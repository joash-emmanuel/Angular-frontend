import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './AuthenticationService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let loginData = {
        password: null,
        username: "david@example.com",
        authorities: [],
        accountNonExpired: true,
        enabled: true,
        credentialsNonExpired: true,
        accountNonLocked: true
    }

    let user = {
        id: 3,
        firstName: "David",
        lastName: "Example",
        email: "david@example.com",
        token: "a5voDxum",
        dob: "2005-05-21",
        profilePicUrl: "/static/profilepic/boy.png",
        acceptedTermsAndConditions: false,
        gender: "M",
        invitationCode: "2746jdfgisdf",
        walletActivated: true,
        admin: true,
        password: "$2a$10$ENllluwelGrkRg0cFAJGQOVhzDP3G62mo41T0Qu4IXQSymqNoOiji",
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return user from server response', () => {
        expect(service.serverUser()).toEqual(of(user));
    })

    it('should return logindata from server response', () => {
        expect(service.login("david@example.com", "password")).toEqual(of(loginData));
    })


})