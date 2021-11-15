import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  name?: string;
  bioforms:  any;
  companies:  any;
  searchForm?: FormGroup;
  userProfileSub?: Subscription;
  number?: any;
  businesss?: any;
  logo?: any;
  isSent: boolean = false;
  isLoading: boolean = false;
  loadingText: string = "";
  isComment: boolean = false;
  vacancyForm!: FormGroup;
  CurrentDate = new Date();
  validated: boolean = false;
  // selectedImage?: ImageSnippet;
  data: any;

  constructor(private forms: FormsService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.name = user.user.first_name;

    this.forms.getAllBioForms().subscribe((result: any) => {
      this.bioforms = result.data;
      this.number = result.data.length;
      console.log(this.bioforms);

    });
  }

  handleTerm(term: string) {

  }

  deletePost(id: any) {

  }

}
