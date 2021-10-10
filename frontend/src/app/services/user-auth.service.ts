import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, interval, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export  class  Users {
  fname?:  string;
  lname?: string;
  email?:  string;
  username?:  string;
  password?:  string;
  active?: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private server_url = environment.serverUrl;
  authToken: any;
  private token: any;
  user?: Object;
  public surname?: any;
  userdata: any;
  private currentUserSubject?: BehaviorSubject<Users>;
  public currentUser?: Observable<Users>;
  private userMessage = new BehaviorSubject({});
  sharedMessage = this.userMessage.asObservable();

  constructor(private http: HttpClient,) { }

  nextUserMessage(message: string) {
    this.userMessage.next(message)
  }

  //method to register a new user
  registerUser(user: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + 'users/signup', user, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }

//method to check if the email already exist upon register
  getEmail(email: any): any {
    const data = {
      email
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + 'users/checkEmail', data, {
        headers: httpOptions.headers
      })

      .pipe(map(res => res));
  }


  //method to authenticate user upon log in
  login(user: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: ''
      })
    };

    return this.http
      .post(this.server_url + 'users/login_authenticate', user, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }

  // method to be used to decrypt the username and get it back from the backend
  decryptUserData(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + 'users/decryptdata', data, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }

  //method to verify user account
  accountActivation(bidder_id: number = 24): Observable<any> {
    console.log("sdfsdf")
    return this.http.get(this.server_url + 'users/activation/' + bidder_id)
  .pipe(catchError(this.handleError));
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      return user.token && true;
    } else { return false; }
  }

  //capture errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }
    let errMsg = errorResponse.statusText + errorResponse.url + "Not found"
    return throwError(
      errMsg
    );
  }
}



