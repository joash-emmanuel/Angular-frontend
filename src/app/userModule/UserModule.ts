import { NgModule } from '@angular/core';
import { WizardComponent } from '../crossCutting/wizard/WizardComponent';
import { HeaderComponent } from './components/header/HeaderComponent';
import { IndexComponent } from './components/index/IndexComponent';
import { IndexService } from './components/index/IndexService';
import { MenuComponent } from './components/menu/MenuComponent';
import { UserRoutingModule } from './UserRoutingModule';
import { PledgeModeComponent } from './components/addGift/pledgeMode/PledgeModeComponent';
import { PledgePaymentPlanComponent } from './components/addGift/pledgePaymentPlan/PledgePaymentPlanComponent';
import { PledgeTypeComponent } from './components/addGift/pledgeType/PledgeTypeComponent';
import { CareShopComponent } from './components/careshop/careShop/CareShopComponent';
import { DeclineComponent } from './components/careshop/decline/DeclineComponent';
import { ChatComponent } from './components/chat/ChatComponent';
import { ConnectsComponent } from './components/connects/connects/ConnectsComponent';
import { ConnectsGiftComponent } from './components/connects/gifts/ConnectsGiftComponent';
import { CreateBrandConfirmationMessageComponent } from './components/createBrand/confirmationMessage/CreateBrandConfirmationMessageComponent';
import { CreateBrandEnterLocationAddressComponent } from './components/createBrand/enterLocationAddress/CreateBrandEnterLocationAddressComponent';
import { CreateBrandEnterServiceCategoryComponent } from './components/createBrand/enterServiceCategory/CreateBrandEnterServiceCategoryComponent';
import { CreateBrandInformationComponent } from './components/createBrand/information/CreateBrandInformationComponent';
import { CreateBrandUploadImageComponent } from './components/createBrand/uploadimage/CreateBrandUploadImageComponent';
import { CreateListingPackageDescriptionComponent } from './components/createListing/packageDescription/CreateListingPackageDescriptionComponent';
import { CreateListingPackagePreviewComponent } from './components/createListing/packagePreview/CreateListingPackagePreviewComponent';
import { CreateListingUploadImagesComponent } from './components/createListing/uploadImages/CreateListingUploadImagesComponent';
import { LogComponent } from './components/logs/log/LogComponent';
import { LogsComponent } from './components/logs/logs/LogsComponent';
import { NotificationsComponent } from './components/notifications/NotificationsComponent';
import { RepostLogStoryComponent } from './components/repost/logStory/RepostLogStoryComponent';
import { RepostLogsPostComponent } from './components/repost/logsPost/RepostLogsPostComponent';
import { PreviewLogComponent } from './components/repost/previewLog/PreviewLogComponent';
import { RepostUploadImagesComponent } from './components/repost/uploadimages/RepostUploadImagesComponent';
import { WalletDetailsComponent } from './components/wallet/details/WalletDetailsComponent';
import { WalletComponent } from './components/wallet/wallet/WalletComponent';
import { ListingComponent } from './components/listing/ListingComponent';
import { MatTabsModule } from '@angular/material/tabs'
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile/ProfileComponent';
import { ProfileLoggedByComponent } from './components/profile/loggedby/ProfileLoggedByComponent';
import { UserService } from './components/user/UserService';
import { LoginModalComponent } from './components/loginModal/LoginModalComponent';
import { NgbActiveModal, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LibHttp } from '../lib/http/LibHttp';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AcceptInvitationModalComponent } from './components/acceptInvitationModal/AcceptInvitationModalComponent';
import { AcceptInvitationLoginModalComponent } from './components/acceptInvitationLoginModal/AcceptInvitationLoginModalComponent';
import { LogService } from './components/logs/LogService';
import { BrandComponent } from './components/brands/BrandComponent';
import { AdminDashboardComponent } from './components/admin/dashboard/AdminDashboardComponent';
import { AdminManageComponent } from './components/admin/manage/AdminManageComponent';
import { AdminUserComponent } from './components/admin/user/AdminUserComponent';
import { AdminUserService } from './components/admin/user/AdminUserService';
import { AdminBirthdayActivityService } from './components/admin/birthdayActivity/AdminBirthdayActivityService';
import { AdminBirthdayActivityComponent } from './components/admin/birthdayActivity/AdminBirthdayActivityComponent';
import { AdminLogStoryService } from './components/admin/logstory/AdminLogStoryService';
import { AdminLogStoryComponent } from './components/admin/logstory/AdminLogStoryComponent';
import { AdminPrechatComponent } from './components/admin/prechat/AdminPrechatComponent';
import { AdminPrechatService } from './components/admin/prechat/AdminPrechatService';
import { AdminConnectionValueComponent } from './components/admin/connectionvalues/AdminConnectionValueComponent';
import { AdminBrandConnectionValueService } from './components/admin/connectionvalues/AdminBrandConnectionValueService';
import { AdminShopperConnectionValueService } from './components/admin/connectionvalues/AdminShopperConnectionValueService';
import { AcceptInvitationService } from './components/acceptInvitationModal/AcceptInvitationService';
import { ShopperService } from './components/shopper/ShopperService';
import { LogPostService } from './components/logs/LogPostService';
import { ShopperConnectionRequestService } from './components/shopperconnectionrequest/ShopperConnectionRequestService';
import { WalletService } from './components/wallet/WalletService';
import { ActivateWalletComponent } from './components/wallet/activate/ActivateWalletComponent';
import { BrowserModule } from '@angular/platform-browser';
import { ActivateWalletService } from './components/wallet/activate/ActivateWalletService';
import { LogitService } from './components/logit/LogitService';
import { ShopperConnectionService } from './components/shopperconnection/ShopperConnectionService';
import { ListGiftersComponent } from './components/pledge/listgifters/ListGiftersComponent';
import { PledgeService } from './components/pledge/PledgeService';
import { PledgeComponent } from './components/pledge/PledgeComponent';
import { TransferComponent } from './components/wallet/transfer/TransferComponent';
import { BrandConnectionService } from './components/brands/brandConnection/BrandConnectionService';
import { BrandService } from './components/brands/BrandService';
import { BrandConnectComponent } from './components/brands/brandConnect/BrandConnectComponent';
import { EndorseBrandComponent } from './components/brands/endorseBrand/EndorseBrandComponent';
import { NotificationsService } from './components/notifications/NotificationsService';
import { InviteFriendsComponent } from './components/inviteFriends/InviteFriendsComponent';
import { ChatService } from './components/chat/ChatService';
import { RepostComponent } from './components/logs/repost/RepostComponent';
import { ShareComponent } from './components/logs/share/ShareComponent';
import { ShopperConnectionRequestComponent } from './components/shopperconnectionrequest/ShopperConnectionRequestComponent';
import { SettingsComponent } from './components/settings/SettingsComponent';
import { SettingsMenuComponent } from './components/settings/settingsMenu/SettingsMenuComponent';
import { TimeZoneComponent } from './components/settings/timeZone/TimeZoneComponent';
import { PolicyComponent } from './components/settings/policy/PolicyComponent';
import { LogsNotificationsComponent } from './components/settings/logsNotifications/LogsNotificationsComponent';
import { HelpComponent } from './components/settings/help/HelpComponent';
import { SettingsService } from './components/settings/SettingsService';
import { LogImageService } from './components/logs/LogImageService';
import { EditProfileComponent } from './components/profile/edit/EditProfileComponent';
import { ShareService } from './components/logs/share/ShareService';
import { AcceptInvitationComponent } from './components/accept-invitation/accept-invitation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    MenuComponent,
    WizardComponent,
    ProfileComponent,
    PledgeModeComponent,
    PledgePaymentPlanComponent,
    PledgeTypeComponent,
    CareShopComponent,
    DeclineComponent,
    ChatComponent,
    ConnectsComponent,
    ConnectsGiftComponent,
    CreateBrandConfirmationMessageComponent,
    CreateBrandEnterLocationAddressComponent,
    CreateBrandEnterServiceCategoryComponent,
    CreateBrandInformationComponent,
    CreateBrandUploadImageComponent,
    CreateListingPackageDescriptionComponent,
    CreateListingPackagePreviewComponent,
    CreateListingUploadImagesComponent,
    LogComponent,
    LogsComponent,
    NotificationsComponent,
    RepostLogStoryComponent,
    RepostLogsPostComponent,
    PreviewLogComponent,
    RepostUploadImagesComponent,
    WalletDetailsComponent,
    WalletComponent,
    ListingComponent,
    ProfileLoggedByComponent,
    LoginModalComponent,
    AcceptInvitationModalComponent,
    AcceptInvitationLoginModalComponent,
    BrandComponent,
    AdminDashboardComponent,
    AdminManageComponent,
    AdminUserComponent,
    AdminBirthdayActivityComponent,
    AdminLogStoryComponent,
    AdminPrechatComponent,
    AdminConnectionValueComponent,
    ActivateWalletComponent,
    ListGiftersComponent,
    PledgeComponent,
    TransferComponent,
    BrandConnectComponent,
    EndorseBrandComponent,
    InviteFriendsComponent,
    RepostComponent,
    ShareComponent,
    AcceptInvitationComponent,
    ShopperConnectionRequestComponent,
    SettingsComponent,
    SettingsMenuComponent,
    TimeZoneComponent,
    PolicyComponent,
    LogsNotificationsComponent,
    HelpComponent,
    EditProfileComponent,
  ],
  imports: [
    UserRoutingModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
    IndexService,
    UserService,
    LogService,
    AdminUserService,
    AdminBirthdayActivityService,
    AdminLogStoryService,
    AdminPrechatService,
    AdminBrandConnectionValueService,
    AdminShopperConnectionValueService,
    AcceptInvitationService,
    ShopperService,
    LogPostService,
    ShopperConnectionRequestService,
    LogitService,
    ShopperConnectionService,
    LibHttp,
    NgbActiveModal,
    HttpClient,
    WalletService,
    ActivateWalletService,
    PledgeService,
    BrandConnectionService,
    BrandService,
    NotificationsService,
    ChatService,
    SettingsService,
    LogImageService,
    ShareService
  ],
  bootstrap: [IndexComponent]
})
export class UserModule { }