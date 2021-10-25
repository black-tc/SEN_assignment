import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  @ViewChild('nav')
  navigation?: ElementRef;

  @ViewChild('toggler')
  toggler?: ElementRef;

  navOpen = false;

  constructor(private renderer: Renderer2, private route: Router, public auth: UserAuthService) { }

  ngOnInit(): void {
  }

  // funtion to toggle the side nav bar in mobile version
  toggleNav() {
    this.navOpen = !this.navOpen;
    if (this.navOpen) {
      this.renderer.addClass(document.body, 'mobile-nav-active');
    } else {
      this.renderer.removeClass(document.body, 'mobile-nav-active');
    }
  }

  collapse(event: any) {
  }

  //function to check if the current route is sign in, sign up or reset password pages
  get isSignIn(): boolean {
    return this.route.url === "/auth/signin" ||  this.route.url === "/auth/signup";
  }

  signOut() {

    localStorage.removeItem('user'); 
    this.route.navigate(['/'])
  }



}
