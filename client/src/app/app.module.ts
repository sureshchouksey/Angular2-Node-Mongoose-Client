import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DeviceUserComponent } from './device-user/device-user.component';
import { PushNotificationService} from './services/push-notification.service';
import { UserService} from './services/user.service';
import { LoginComponent } from './login/login.component';
import { AuthService} from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { SharedModule } from './shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import { LogoutComponent } from './logout/logout.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    DeviceUserComponent,
    LoginComponent,
    NotificationComponent,
    LogoutComponent,
    DeviceDetailComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [PushNotificationService,UserService,AuthService,AuthGuardLogin,
    AuthGuardAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
