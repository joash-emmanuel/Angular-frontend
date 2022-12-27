import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { chunk, get, mergeWith } from 'lodash';
import { BehaviorSubject, combineLatestWith } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/AuthenticationService';
import { ConfigService } from 'src/app/config/ConfigService';
import { Util } from 'src/app/lib/utils/Util';
import { AcceptInvitationLoginModalComponent } from '../../acceptInvitationLoginModal/AcceptInvitationLoginModalComponent';
import { BrandConnection } from '../../brands/brandConnection/BrandConnection';
import { BrandConnectionLoaded } from '../../brands/brandConnection/BrandConnectionLoaded';
import { BrandConnectionService } from '../../brands/brandConnection/BrandConnectionService';
import { LogitService } from '../../logit/LogitService';
import { LogPost } from '../../logs/LogPost';
import { LogPostService } from '../../logs/LogPostService';
import { Shopper } from '../../shopper/Shopper';
import { ShopperLoaded } from '../../shopper/ShopperLoaded';
import { ShopperService } from '../../shopper/ShopperService';
import { ShopperConnection } from '../../shopperconnection/ShopperConnection';
import { ShopperConnectionService } from '../../shopperconnection/ShopperConnectionService';
import { User } from '../../user/User';
import { ActivateWalletModalComponent } from '../../wallet/activateWalletModal/ActivateWalletModalComponent';

@Component({
  templateUrl: './ProfileComponent.html'
})
export class ProfileComponent implements OnInit {

  shopperId!: number;
  shopper!: Shopper;
  ownProfile: boolean = false;
  connected: boolean = false;
  loggedByCount!: number;
  connectsCount!: number;
  yourLogs: LogPost[] = [];
  brandConnectionChunks: BrandConnectionLoaded[][] = [];
  shopperConnectionChunks: ShopperLoaded[][] = [];
  brandConnects: BrandConnectionLoaded[] = [];
  shopperConnects: ShopperLoaded[] = [];
  loggedInShopper!: Shopper;
  loggedInShopperShopperConnectsIds: number[] = [];
  loggedInShopperBrandConnectsIds: number[] = [];
  chunkSize: number = 2;

  dropDownActive: boolean = false;

  active = 1;

  constructor(private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    public shopperService: ShopperService,
    private logitService: LogitService,
    private shopperConnectionService: ShopperConnectionService,
    private brandConnectionService: BrandConnectionService,
    private logPostService: LogPostService,
    private modalService: NgbModal,
    private router: Router,
    public configService: ConfigService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(combineLatestWith(this.authenticationService.user))
      .subscribe(v => {
        console.log("pipe value", v);

        let params: Params = v[0];
        let user: User | boolean | null = v[1];

        if (!(params || user)) {
          console.log("neither, returning");
          return;
        }

        user = <Shopper>user;

        this.loggedInShopper = <Shopper>user;

        if (params['shopperId']) {
          this.shopperId = params['shopperId'];
        }
        else if (user) {
          this.shopperId = <number>user.id;
          this.shopper = <Shopper>user;
        }

        if (this.shopperId && user && this.shopperId === user.id) {
          this.ownProfile = true;
        }

        if (!this.shopper) {
          this.shopperService.get(this.shopperId).subscribe(shopper => this.shopper = shopper);
        }

        this.logitService.loggedByCount(this.shopperId).subscribe(response => this.loggedByCount = response);
        this.shopperConnectionService.connectionCount(this.shopperId).subscribe(response => this.connectsCount = response);
        this.shopperConnectionService.list(this.shopperId).subscribe(shopperConnections => {
          this.shopperConnects = shopperConnections;
          this.refreshChunks();
        });

        this.brandConnectionService.yourBrands(this.shopperId).subscribe(brandConnections => {
          this.brandConnects = brandConnections;
          this.refreshChunks();
        });

        this.logPostService.shopperLogs(this.shopperId).subscribe(yourLogs => this.yourLogs = yourLogs);

        if (this.loggedInShopper && this.loggedInShopper.id !== this.shopperId) {
          this.shopperConnectionService.list(this.loggedInShopper.id).subscribe(shopperConnections => {
            this.loggedInShopperShopperConnectsIds = shopperConnections.map(v => v.id);
          });
          this.brandConnectionService.yourBrands(this.loggedInShopper.id).subscribe(brandConnections => {
            this.loggedInShopperBrandConnectsIds = brandConnections.map(v => v.brand.id);
          });
        }
      });

  }

  refreshChunks() {

    let breakPointChunkSizes =
    {
      "(min-width: 1200px)": 4,
      "(min-width: 992px) and (max-width: 1199px)": 4,
      "(min-width: 768px) and (max-width: 991px)": 3,
      "(min-width: 576px) and (max-width: 767px)": 2,
      "(max-width: 575px)": 2
    }
      ;

    // detect screen size changes
    this.breakpointObserver.observe([
      "(min-width: 1200px)",
      "(min-width: 992px) and (max-width: 1199px)",
      "(min-width: 768px) and (max-width: 991px)",
      "(min-width: 576px) and (max-width: 767px)",
      "(max-width: 575px)"

    ]).subscribe((result: BreakpointState) => {
      for (let breakpoint in result.breakpoints) {
        if (result.breakpoints[breakpoint] === true) {

          this.chunkSize = get(breakPointChunkSizes, breakpoint);

          this.brandConnectionChunks = chunk(this.brandConnects, this.chunkSize);
          this.shopperConnectionChunks = chunk(this.shopperConnects, this.chunkSize);

          console.log('breakpoint', breakpoint, 'chunkSize', this.chunkSize);
        }
      }
    });
  }

  horoscope() {
    if (!this.shopper) {
      return "";
    }
    return Util.horoscope(this.shopper.dob);
  }

  edit() {
    if (this.loggedInShopper.admin) {
      return;
    }

    this.router.navigate(['index','profile', 'edit']);
  }

  connect() {
    if (!this.loggedInShopper) {
      this.modalService.open(AcceptInvitationLoginModalComponent)
    }
    else if (!this.loggedInShopper.walletActivated) {
      this.modalService.open(ActivateWalletModalComponent);
    }
    else if (this.loggedInShopper.admin) {
      return;
    }
    else {
      this.router.navigate(['shopperconnect', this.shopperId])
    }
  }

  shopperConnect(shopperId: number) {
    if (!this.loggedInShopper) {
      this.modalService.open(AcceptInvitationLoginModalComponent)
    }
    else if (!this.loggedInShopper.walletActivated) {
      this.modalService.open(ActivateWalletModalComponent);
    }
    else if (this.loggedInShopper.admin) {
      return;
    }
    else {
      this.router.navigate(['shopperconnect', shopperId])
    }
  }

  brandConnect(brandId: number) {
    if (!this.loggedInShopper) {
      this.modalService.open(AcceptInvitationLoginModalComponent)
    }
    else if (!this.loggedInShopper.walletActivated) {
      this.modalService.open(ActivateWalletModalComponent);
    }
    else if (this.loggedInShopper.admin) {
      return;
    }
    else {
      this.router.navigate(['brandconnect', brandId])
    }
  }

  toggleDropDown() {
    this.dropDownActive = !this.dropDownActive;
  }

  shopperConnected(shopperId: number): boolean {
    return this.loggedInShopper && (this.shopperId === this.loggedInShopper.id || this.loggedInShopperShopperConnectsIds.includes(shopperId));
  }

  brandConnected(brandId: number): boolean {
    return this.loggedInShopper && (this.shopperId === this.loggedInShopper.id || this.loggedInShopperBrandConnectsIds.includes(brandId));
  }

}
