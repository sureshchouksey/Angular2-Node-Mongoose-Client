import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  jwtHelper: JwtHelper = new JwtHelper();
  currentUser = { _id: '', username: '', role: '' };
  constructor(private http: HttpClient,
              private router: Router) { 

    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

    login(username: string, password: string) {
        return this.http.post('http://localhost:5000/api/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                
                let user = response;                
                if (user && user.hasOwnProperty('token')) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes                    
                    localStorage.setItem('token', JSON.stringify(response['token']));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = { _id: '', username: '', role: '' };
        window.location.reload();
        this.router.navigate(['/']);
    }

    decodeUserFromToken(token) {
      return this.jwtHelper.decodeToken(token).user;
    }

    setCurrentUser(decodedUser) {
      console.log('Inside setCurrentUser')
      this.loggedIn = true;
      this.currentUser._id = decodedUser._id;
      this.currentUser.username = decodedUser.username;
      this.currentUser.role = decodedUser.role;
      console.log('Auth Serivce',this);
      decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
      delete decodedUser.role;
    }

}
