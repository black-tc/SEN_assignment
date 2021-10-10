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
//admin components
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

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
{
  path: "bio-form", component: BioFormComponent, canActivate: [UserAuthGuard]

},
{
  path: "dashboard", component: DashboardComponent, canActivate: [UserAuthGuard]

},
{
  path: "its-form", component: ItsFormComponent, canActivate: [UserAuthGuard]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
