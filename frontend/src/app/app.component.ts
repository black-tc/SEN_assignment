import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CPBN - Home';
  isLoading: Boolean = true;



  constructor() {

  }

  async ngOnInit() {
     this.isLoading = false;
  }


}
