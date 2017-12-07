import { Injectable} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class UserService{

     constructor(private http: HttpClient,) { }

     register(user): Observable<any> {       

        return this.http.post<any>('http://localhost:5000/api/user', JSON.stringify(user), httpOptions).pipe(
	      tap((user) => console.log(`added hero w/ id=${user.username}`)),
	      catchError(this.handleError<any>('addHero'))
	    );
    }

    login(credentials):Observable<any>{
      //    return this.http.post<any>('http://localhost:5000/api/login', JSON.stringify(credentials), httpOptions).pipe(
	    //    tap((user) => console.log(`added hero w/ id=${user.username}`)),
	    //    catchError(this.handleError<any>('addHero'))
			//  );
				return this.http.post('http://localhost:5000/api/login', JSON.stringify(credentials), httpOptions);	
    }

    /**
	   * Handle Http operation that failed.
	   * Let the app continue.
	   * @param operation - name of the operation that failed
	   * @param result - optional value to return as the observable result
	   */
	  private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead

	      // TODO: better job of transforming error for user consumption
	      console.log(`${operation} failed: ${error.message}`);

	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	  }   
}