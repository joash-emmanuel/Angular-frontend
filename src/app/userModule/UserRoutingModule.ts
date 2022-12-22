import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareShopComponent } from './components/careshop/careShop/CareShopComponent';
import { ConnectsGiftComponent } from './components/connects/gifts/ConnectsGiftComponent';
import { IndexComponent } from './components/index/IndexComponent';
import { ListingComponent } from './components/listing/ListingComponent';
import { LogsComponent } from './components/logs/logs/LogsComponent';
import { NotificationsComponent } from './components/notifications/NotificationsComponent';
import { WalletDetailsComponent } from './components/wallet/details/WalletDetailsComponent';
import { WalletComponent } from './components/wallet/wallet/WalletComponent';
import { BrandComponent } from './components/brands/BrandComponent';
import { AdminDashboardComponent } from './components/admin/dashboard/AdminDashboardComponent';
import { AdminManageComponent } from './components/admin/manage/AdminManageComponent';
import { AdminUserComponent } from './components/admin/user/AdminUserComponent';
import { AdminBirthdayActivityComponent } from './components/admin/birthdayActivity/AdminBirthdayActivityComponent';
import { AdminLogStoryComponent } from './components/admin/logstory/AdminLogStoryComponent';
import { AdminPrechatComponent } from './components/admin/prechat/AdminPrechatComponent';
import { AdminConnectionValueComponent } from './components/admin/connectionvalues/AdminConnectionValueComponent';
import { ActivateWalletComponent } from './components/wallet/activate/ActivateWalletComponent';
import { ProfileComponent } from './components/profile/profile/ProfileComponent';
import { ListGiftersComponent } from './components/pledge/listgifters/ListGiftersComponent';
import { PledgeComponent } from './components/pledge/PledgeComponent';
import { ChatComponent } from './components/chat/ChatComponent';
import { TransferComponent } from './components/wallet/transfer/TransferComponent';
import { BrandConnectComponent } from './components/brands/brandConnect/BrandConnectComponent';
import { EndorseBrandComponent } from './components/brands/endorseBrand/EndorseBrandComponent';
import { InviteFriendsComponent } from './components/inviteFriends/InviteFriendsComponent';
import { RepostComponent } from './components/logs/repost/RepostComponent';
import { ShareComponent } from './components/logs/share/ShareComponent';
import { ShopperConnectionRequestComponent } from './components/shopperconnectionrequest/ShopperConnectionRequestComponent';
import { SettingsComponent } from './components/settings/SettingsComponent';
import { TimeZoneComponent } from './components/settings/timeZone/TimeZoneComponent';
import { LogsNotificationsComponent } from './components/settings/logsNotifications/LogsNotificationsComponent';
import { PolicyComponent } from './components/settings/policy/PolicyComponent';
import { HelpComponent } from './components/settings/help/HelpComponent';
import { EditProfileComponent } from './components/profile/edit/EditProfileComponent';
import { AcceptInvitationComponent } from './components/accept-invitation/accept-invitation.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: 'home',
                component: ListingComponent
            },
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                path: 'logs',
                component: LogsComponent
            },
            {
                path: 'admindashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'admin/manage',
                component: AdminManageComponent
            },
            {
                path: 'admin/user',
                component: AdminUserComponent
            },
            {
                path: 'manage/birthdayactivities',
                component: AdminBirthdayActivityComponent
            },
            {
                path: 'manage/logstories',
                component: AdminLogStoryComponent
            },
            {
                path: 'manage/prechats',
                component: AdminPrechatComponent
            },
            {
                path: 'manage/connectionvalues',
                component: AdminConnectionValueComponent
            },
            {
                path: 'brands',
                component: BrandComponent
            },
            {
                path: 'connects/gift',
                component: ConnectsGiftComponent
            },
            {
                path: 'wallet/wallet',
                component: WalletComponent
            },
            {
                path: 'wallet/details',
                component: WalletDetailsComponent
            },
            {
                path: 'wallet/activate',
                component: ActivateWalletComponent
            },
            {
                path: 'wallet/transfer',
                component: TransferComponent
            },
            {
                path: 'profile/profile',
                component: ProfileComponent
            },
            {
                path: 'profile/profile/:shopperId',
                component: ProfileComponent
            },
            {
                path: 'pledge/listgifters/:logId',
                component: ListGiftersComponent
            },
            {
                path: 'pledge/:logId',
                component: PledgeComponent
            },
            {
                path: 'chat/:logId',
                component: ChatComponent
            },
            {
                path: 'brandconnect/:brandId',
                component: BrandConnectComponent
            },
            {
                path: 'brand/endorse',
                component: EndorseBrandComponent
            },
            {
                path: 'invitefriends',
                component: InviteFriendsComponent
            },
            {
                path: 'repost/:logPostId',
                component: RepostComponent
            },
            {
                path: 'share/:logPostId',
                component: ShareComponent
            },
            {
                path: 'shopperconnect/:shopperId',
                component: ShopperConnectionRequestComponent
            },
            {
                path: "profile/edit",
                component: EditProfileComponent
            }

        ]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {
                path: 'timezone',
                component: TimeZoneComponent
            },
            {
                path: 'logsnotifications',
                component: LogsNotificationsComponent
            },
            {
                path: 'policy',
                component: PolicyComponent
            },
            {
                path: 'help',
                component: HelpComponent
            },
        ]
    },
    {
        path: 'acceptInvitation',
        component: AcceptInvitationComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }