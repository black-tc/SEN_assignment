import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { BiddersLoginComponent } from './components/bidders-login/bidders-login.component';
import { BiddersRegisterComponent } from './components/bidders-register/bidders-register.component';
import { BiddersForgotPasswordComponent } from './components/bidders-forgot-password/bidders-forgot-password.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { BioFormComponent } from './components/bio-form/bio-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItsFormComponent } from './components/its-form/its-form.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';

//admin components
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DashboardBioApplicationsComponent } from './components/admin/dashboard-bio-applications/dashboard-bio-applications.component';

//defining our routes
const routes: Routes = [

  //default route to Landing page
  {
    path: "",
    component: LandingComponent,
    data: {
        title: "Namibia University of Science and Technology",
    },
},
//home route
{
  path: "home", component: LandingComponent

},
//login route
{
  path: "auth/signin", component: BiddersLoginComponent

},
//sign up route
{
  path: "auth/signup", component: BiddersRegisterComponent

},
//forgot password route
{
  path: "auth/forgot-password", component: BiddersForgotPasswordComponent

},
//successful register redirect route
{
  path: "auth/signup-success", component: RegisterSuccessComponent

},
//email verication success
{
  path: "auth/verification/:id", component: EmailVerificationComponent

},
//admin login page
{
  path: "auth/admin/signin", component: AdminLoginComponent

},
//bio form page
{
  path: "bio-form", component: BioFormComponent, canActivate: [UserAuthGuard]

},
//user dashboard page
{
  path: "dashboard", component: DashboardComponent, canActivate: [UserAuthGuard]
},
{
  path: "admin_dashboard", component: AdminDashboardComponent, canActivate: [AdminAuthGuard]
},
//ITS access form page
{
  path: "its-form", component: ItsFormComponent, canActivate: [UserAuthGuard]
},
//ITS access form page
{
  path: "admin_dashboard/bio_forms", component: DashboardBioApplicationsComponent, canActivate: [AdminAuthGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
