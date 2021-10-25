import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  name? : string;
  surname?: string;

  constructor() { }

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user')!);
    this.name = user.user.first_name;
    this.surname = user.user.last_name;
  }

}
