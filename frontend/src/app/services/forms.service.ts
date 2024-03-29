import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private server_url = environment.serverUrl;

  constructor(private http: HttpClient) { }

  submitBio(form: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + 'users/submit-bio-form', form, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }

  submitITS(form: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + 'users/submit-its-form', form, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }

  getAllBioForms() {
    const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     // Authorization: this.token
   })
 };

 return this.http.get(this.server_url + 'users/get-all-bio-forms', { headers: httpOptions.headers })
   .pipe(map(res => res));

}

getForm(_id: string) {
  const id = {
    _id,
  };

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: this.token
    })
  };

  return this.http.post(this.server_url + 'users/get-bio-form', id, { headers: httpOptions.headers })
    .pipe(map(res => res));

}

getAllITSForms() {
  const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json',
   // Authorization: this.token
 })
};

return this.http.get(this.server_url + 'users/get-all-its-forms', { headers: httpOptions.headers })
 .pipe(map(res => res));

}
}
