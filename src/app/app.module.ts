import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { TinymceModule } from 'angular2-tinymce';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './client/home/home.component';
import { PageComponent } from './admin/pages/page/page.component';
import { ListComponent } from './admin/pages/list/list.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { PasswordRecoveryComponent } from './admin/auth/password-recovery/password-recovery.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    HomeComponent,
    PageComponent,
    ListComponent,
    LoginComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdCheckboxModule,
    HttpModule,
    FormsModule,
    TinymceModule.withConfig({})
  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
