import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  createForm = new FormGroup({
    department: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    personnel_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    lname: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    academic: new FormControl('', [Validators.required]),
   
  });

  name?: string;
  bioforms:  any;
  itsforms:  any;
  companies:  any;
  searchForm?: FormGroup;
  userProfileSub?: Subscription;
  number?: any;
  total?: any;
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

    this.forms.getAllITSForms().subscribe((result: any) => {
      this.itsforms = result.data;
      this.total = result.data.length;
      console.log(this.itsforms);

  });

  this.forms.getForm(user.user.id).subscribe((res: any) => {
  this.createForm.patchValue({

    fname: res.data.fname,
    lname: res.data.lname,
    email: res.data.email,
    bio: res.data.bio,
    d_o_b: res.data.d_o_b,
    experience: res.data.experience,
    skills: res.data.skills,
    hobbies: res.data.hobbies,
    qualification: res.data.qualification,
    location: res.data.location,
    resume: res.data.resume,
    // pic: res.data.pic,
    phone: res.data.phone

  })
})
  }

  handleTerm(term: string) {

  }

  deletePost(id: any) {

  }

}
