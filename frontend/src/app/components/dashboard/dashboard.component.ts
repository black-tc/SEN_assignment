import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  name?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user')!);
    this.name = user.user.first_name;
    
    
  }

  redirectToBio() {
    this.router.navigate(['/bio-form']);
  }

  redirectToITS() {
    this.router.navigate(['/its-form']);
  }

}
