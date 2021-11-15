import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormsService } from 'src/app/services/forms.service';


@Component({
  selector: 'app-its-form',
  templateUrl: './its-form.component.html',
  styleUrls: ['./its-form.component.scss']
})
export class ItsFormComponent implements OnInit {

  createForm = new FormGroup({
    department: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[- +()0-9]+')]),
    personnel_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    lname: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    academic: new FormControl('', [Validators.required]),
   
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
  email:this.createForm.value.email,
  lname: this.createForm.value.lname,
  title: this.createForm.value.title,
  academic: this.createForm.value.academic,
  department: this.createForm.value.department,
 }
 
     //register business account if email doesn't exist
     this.form.submitITS(form).subscribe((data: any) => {

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

