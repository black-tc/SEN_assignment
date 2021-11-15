import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { BiddersLoginComponent } from './components/bidders-login/bidders-login.component';
import { BiddersRegisterComponent } from './components/bidders-register/bidders-register.component';
import { BiddersForgotPasswordComponent } from './components/bidders-forgot-password/bidders-forgot-password.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ReadAllButtonComponent } from './shared/read-all-button/read-all-button.component';
import { QuickLinksComponent } from './shared/quick-links/quick-links.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { ButtonLoaderComponent } from './shared/button-loader/button-loader.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { MediaCentreComponent } from './components/media-centre/media-centre.component';
import { PageIntroComponent } from './shared/page-intro/page-intro.component';
import { BioFormComponent } from './components/bio-form/bio-form.component';
import { ItsFormComponent } from './components/its-form/its-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DashboardNavbarComponent } from './components/admin/dashboard-navbar/dashboard-navbar.component';
import { DashboardBioApplicationsComponent } from './components/admin/dashboard-bio-applications/dashboard-bio-applications.component';
import { DashboardBioFormComponent } from './components/admin/dashboard-bio-applications/dashboard-bio-form/dashboard-bio-form.component';
import { DashboardHeadingComponent } from './components/admin/dashboard-heading/dashboard-heading.component';
import { SearchComponent } from './shared/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    BiddersLoginComponent,
    BiddersRegisterComponent,
    BiddersForgotPasswordComponent,
    LoaderComponent,
    ReadAllButtonComponent,
    QuickLinksComponent,
    ScrollToTopComponent,
    ErrorMessageComponent,
    RegisterSuccessComponent,
    AdminLoginComponent,
    ButtonLoaderComponent,
    EmailVerificationComponent,
    MediaCentreComponent,
    PageIntroComponent,
    BioFormComponent,
    ItsFormComponent,
    DashboardComponent,
    AdminDashboardComponent,
    DashboardNavbarComponent,
    DashboardBioApplicationsComponent,
    DashboardBioFormComponent,
    DashboardHeadingComponent,
    SearchComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
