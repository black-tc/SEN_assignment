import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  fieldTextType?: boolean;
  submitted: boolean = false;
  successMsg?: string;
  errorMsg: boolean = false;
  loading = false;
  public loadingMsg = 'Authenticating...Please wait';
  errorMessage?: string;
  waiting: Boolean = false;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    document.title = "Sign in: Admin"
  }

   //get form controls
   get f() {
    return this.loginForm.controls;
  }

  //Toggle show password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


//function for admin log in
  async login(event: Event) {
    
    event.preventDefault();

    this.loading = true;
    this.waiting = true;
    this.submitted = true;

//check if the form is valid, if not it shouldn't proceed with the request
    if (this.loginForm.invalid) {

      return;
    }
    //if the form is valid
    else if (this.loginForm.valid){
      //creating a user object

      const user = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

    this.auth.admin_login(user).subscribe( (data: any) => {

      if (data.success) {
        const user = {
        user: data.user,
        token: data.token,
        isLoggedin: true
      }

      //saving user data in local storage
      localStorage.setItem('user', JSON.stringify(user));

      setTimeout(() => {
      this.waiting = false;
      this.router.navigate(['/admin_dashboard']);
        }, 400);
        }
        else if(!data.success) {

          this.errorMsg = true;

          this.loading = false;
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.waiting = false;
              }, 400);

        }
    })
    }

  }

}
