import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormsService } from 'src/app/services/forms.service';


@Component({
  selector: 'app-bio-form',
  templateUrl: './bio-form.component.html',
  styleUrls: ['./bio-form.component.scss']
})
export class BioFormComponent implements OnInit {

  createForm = new FormGroup({
    personnel_number: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    lname: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    faculty: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    work_phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    department: new FormControl('', [Validators.required]),
    postal_address: new FormControl('', [Validators.required]),
    phone_home: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    next_of_kin: new FormControl('', [Validators.required]),
    next_of_kin_phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+') ]),
    qualification: new FormControl('', [Validators.required]),
    institution: new FormControl('', [Validators.required]),
    field_study: new FormControl('', [Validators.required]),
    specialization: new FormControl('', [Validators.required]),
    language_description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    // work_phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    // department: new FormControl('', [Validators.required]),
    // postal_address: new FormControl('', [Validators.required]),
    // phone_home: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    // next_of_kin: new FormControl('', [Validators.required]),
    // next_of_kin_phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+') ]),
    // qualification: new FormControl('', [Validators.required])
  },
  );
  submitted: Boolean = false;
  loading: Boolean = false;
  btnWait: Boolean = false;
  showSnackbar:Boolean = false;
  message?: String;
  error:Boolean = false;
  maxUpload: Boolean = false;
  missingImage: Boolean = true;
  wrongType: Boolean = false;
  sizeLimit: Boolean = false;
  otherErr: Boolean = false;
  errorMessage: Subject<string> = new Subject();

  constructor(private router: Router, private form: FormsService) { }

  ngOnInit(): void {
    document.title = "NUST: EMPLOYEE BIOGRAPHICAL INFORMATION"
  }

  get f() { return this.createForm?.controls }



// Create form on submit
async onSubmit(event: Event) {
  event.preventDefault();
 this.submitted = true;

 if (this.createForm.invalid) {
   return;
 }

 

 this.loading = true;
 this.btnWait = true;

 const form = {
   
  personnel_number: this.createForm.value.personnel_number,
  fname:this.createForm.value.fname,
  phone: this.createForm.value.phone,
  address: this.createForm.value.address,
  email:this.createForm.value.email,
  lname: this.createForm.value.lname,
  title: this.createForm.value.title,
  faculty: this.createForm.value.faculty,
  position: this.createForm.value.position,
  work_phone: this.createForm.value.work_phone, 
  department: this.createForm.value.department,
  postal_address: this.createForm.value.postal_address,
  phone_home: this.createForm.value.phone_home,
  next_of_kin: this.createForm.value.next_of_kin,
  next_of_kin_phone: this.createForm.value.next_of_kin_phone,
  qualification: this.createForm.value.qualification,
  institution: this.createForm.value.institution,
  field_study: this.createForm.value.field_study,
  specialization: this.createForm.value.specialization,
  language_description: this.createForm.value.language_description,
 }
 
     //register business account if email doesn't exist
     this.form.submitBio(form).subscribe((data: any) => {

       if(data.success) {
        this.ngOnInit()
       }

       this.onComplete();
     });


}


 // After handling form upload response
onComplete() {
 this.loading = false;

 setTimeout(() => {
   this.btnWait = false;
   this.router.navigate(['/dashboard']);
 }, 3000);
}

}
