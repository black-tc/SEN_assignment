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
    // language_description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    
    language_1: new FormControl(''),
    speak_1: new FormControl(''),
    read_1: new FormControl(''),
    write_1: new FormControl(''),

    language_2: new FormControl(''),
    speak_2: new FormControl(''),
    read_2: new FormControl(''),
    write_2: new FormControl(''),

    language_3: new FormControl(''),
    speak_3: new FormControl(''),
    read_3: new FormControl(''),
    write_3: new FormControl(''),

    language_4: new FormControl(''),
    speak_4: new FormControl(''),
    read_4: new FormControl(''),
    write_4: new FormControl(''),

    language_5: new FormControl(''),
    speak_5: new FormControl(''),
    read_5: new FormControl(''),
    write_5: new FormControl(''),

    society_name_1: new FormControl(''),
    society_position_1: new FormControl(''),
    date_joined_1: new FormControl(''),

    society_name_2: new FormControl(''),
    society_position_2: new FormControl(''),
    date_joined_2: new FormControl(''),

    society_name_3: new FormControl(''),
    society_position_3: new FormControl(''),
    date_joined_3: new FormControl(''),

    society_name_4: new FormControl(''),
    society_position_4: new FormControl(''),
    date_joined_4: new FormControl(''),

    body_name_1: new FormControl(''),
    body_position_1: new FormControl(''),
    date_joined_body_1: new FormControl(''),

    body_name_2: new FormControl(''),
    body_position_2: new FormControl(''),
    date_joined_body_2: new FormControl(''),

    body_name_3: new FormControl(''),
    body_position_3: new FormControl(''),
    date_joined_body_3: new FormControl(''),

    body_name_4: new FormControl(''),
    body_position_4: new FormControl(''),
    date_joined_body_4: new FormControl(''),

    publication_name_1: new FormControl(''),
    date_publication_1: new FormControl(''),
    publisher_name_1: new FormControl(''),
    subject_publication_1: new FormControl(''),
    co_author_1: new FormControl(''),

    publication_name_2: new FormControl(''),
    date_publication_2: new FormControl(''),
    publisher_name_2: new FormControl(''),
    subject_publication_2: new FormControl(''),
    co_author_2: new FormControl(''),

    publication_name_3: new FormControl(''),
    date_publication_3: new FormControl(''),
    publisher_name_3: new FormControl(''),
    subject_publication_3: new FormControl(''),
    co_author_3: new FormControl(''),

    publication_name_4: new FormControl(''),
    date_publication_4: new FormControl(''),
    publisher_name_4: new FormControl(''),
    subject_publication_4: new FormControl(''),
    co_author_4: new FormControl('')
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
  employee_details: Boolean = true;
  qualifications: Boolean = false;
  language_capabilities: Boolean = false;
  academic_societies: Boolean = false;
  publications: Boolean = false;
  profession_bodies: Boolean = false;

  constructor(private router: Router, private form: FormsService) { }

  ngOnInit(): void {
    document.title = "NUST: EMPLOYEE BIOGRAPHICAL INFORMATION"
  }

  get f() { return this.createForm?.controls }



// Create form on submit
async onSubmit(event: Event) {
  event.preventDefault();
 this.submitted = true;

 console.log(this.createForm.value);

//  if (this.createForm.invalid) {
//    console.log("Invalid form")
//    return;
//  }

 

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
 
    language_1: this.createForm.value.language_1,
    speak_1: this.createForm.value.speak_1,
    read_1: this.createForm.value.read_1,
    write_1: this.createForm.value.write_1,
  
    language_2: this.createForm.value.language_2,
    speak_2: this.createForm.value.speak_2,
    read_2: this.createForm.value.read_2,
    write_2: this.createForm.value.write_2,

    language_3: this.createForm.value.language_3,
    speak_3: this.createForm.value.speak_3,
    read_3: this.createForm.value.read_3,
    write_3: this.createForm.value.write_3,
 
    language_4: this.createForm.value.language_4,
    speak_4: this.createForm.value.speak_4,
    read_4: this.createForm.value.read_4,
    write_4: this.createForm.value.write_4,
 
    language_5: this.createForm.value.language_5,
    speak_5: this.createForm.value.speak_5,
    read_5: this.createForm.value.read_5,
    write_5: this.createForm.value.write_5,
    
    society_name_1: this.createForm.value.society_name_1,
    society_position_1: this.createForm.value.society_position_1,
    date_joined_1: this.createForm.value.date_joined_1,
    
    society_name_2: this.createForm.value.society_name_2,
    society_position_2: this.createForm.value.society_position_2,
    date_joined_2: this.createForm.value.date_joined_2,
  
    society_name_3: this.createForm.value.society_name_3,
    society_position_3: this.createForm.value.society_position_3,
    date_joined_3: this.createForm.value.date_joined_3,
  
    society_name_4: this.createForm.value.society_name_4,
    society_position_4: this.createForm.value.society_position_4,
    date_joined_4: this.createForm.value.date_joined_4,
  
    body_name_1: this.createForm.value.body_name_1,
    body_position_1: this.createForm.value.body_position_1,
    date_joined_body_1: this.createForm.value.date_joined_body_1,
 
  
    body_name_2: this.createForm.value.body_name_2,
    body_position_2: this.createForm.value.body_position_2,
    date_joined_body_2: this.createForm.value.date_joined_body_2,
  
  
    body_name_3: this.createForm.value.body_name_3,
    body_position_3: this.createForm.value.body_position_3,
    date_joined_body_3: this.createForm.value.date_joined_body_3,
  
 
    body_name_4: this.createForm.value.body_name_4,
    body_position_4: this.createForm.value.body_position_4,
    date_joined_body_4: this.createForm.value.date_joined_body_4,
  
  
    publication_name_1: this.createForm.value.publication_name_1,
    date_publication_1: this.createForm.value.date_publication_1,
    publisher_name_1: this.createForm.value.publisher_name_1,
    subject_publication_1: this.createForm.value.date_publication_1,
    co_author_1: this.createForm.value.publisher_name_1,
  
 
    publication_name_2: this.createForm.value.publication_name_2,
    date_publication_2: this.createForm.value.date_publication_2,
    publisher_name_2: this.createForm.value.publisher_name_2,
    subject_publication_2: this.createForm.value.date_publication_2,
    co_author_2: this.createForm.value.publisher_name_2,
 
  
    publication_name_3: this.createForm.value.publication_name_3,
    date_publication_3: this.createForm.value.date_publication_3,
    publisher_name_3: this.createForm.value.publisher_name_3,
    subject_publication_3: this.createForm.value.date_publication_3,
    co_author_3: this.createForm.value.publisher_name_3,

  
    publication_name_4: this.createForm.value.publication_name_4,
    date_publication_4: this.createForm.value.date_publication_4,
    publisher_name_4: this.createForm.value.publisher_name_4,
    subject_publication_4: this.createForm.value.date_publication_4,
    co_author_4: this.createForm.value.publisher_name_4,
  
 

 }
 
     //register business account if email doesn't exist
     this.form.submitBio(form).subscribe((data: any) => {

       if(data.success) {
         console.log("yipeeeee!")
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

goToQualifications() {
  this.employee_details = false;
  this.language_capabilities = false;
  this.academic_societies = false;
  this.publications = false;
  this.profession_bodies =false
  this.qualifications = true;
}

goToLanguage() {
  this.employee_details = false;
  this.qualifications = false;
  this.academic_societies = false;
  this.publications = false;
  this.profession_bodies =false
  this.language_capabilities = true;
  
}

goToSocieties() {
  this.employee_details = false;
  this.qualifications = false;
  this.language_capabilities = false;
  this.publications = false;
  this.profession_bodies =false
  this.academic_societies = true;
}

goToBodies() {
  this.employee_details = false;
  this.qualifications = false;
  this.language_capabilities = false;
  this.publications = false;
  this.profession_bodies = true;
  this.academic_societies = false;
}

goToPublications() {
  this.employee_details = false;
  this.qualifications = false;
  this.language_capabilities = false;
  this.publications = true;
  this.profession_bodies =false
  this.academic_societies = false;
}

}
