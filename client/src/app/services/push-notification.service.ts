import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Device} from '../model/device';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','x-access-token':'eyJhbGciOiJIUzI1NiJ9.d29ya3BsYWNlT04.wY1KNDeJJqYKOQzF6KHsA-43k89vi86bX3gQckpbBfA' })
};

@Injectable()
export class PushNotificationService {
  
  constructor(private http: HttpClient,) { }
	//serverUrl:String = 'https://fcmprodserver.herokuapp.com';
	//serverUrl:String = 'http://localhost:5000';
	serverUrl:String = 'http://159.8.214.55';
  register(device:Device): Observable<Device> {       

        return this.http.put<Device>(`${this.serverUrl}/device`, JSON.stringify(device), httpOptions).pipe(
	      tap((device:Device) => console.log(`added hero w/ id=${device.username}`)),
	      catchError(this.handleError<Device>('addHero'))
	    );
    }

    getAllDevices():Observable<Device[]>{

    	 return this.http.get<Device[]>(`${this.serverUrl}/device`,httpOptions)
	      .pipe(
	        tap(devices => console.log(`fetched heroes`)),
	        catchError(this.handleError('getAllDevices', []))
	      );
		}
			
		searchDevice(searchDevice):Observable<Device[]>{
			 return this.http.post<Device[]>(`${this.serverUrl}/device/search`,JSON.stringify(searchDevice),httpOptions)
	      .pipe(
	        tap(devices => console.log(`search devices`)),
	        catchError(this.handleError('searchDevice', []))
	      );
		}
		
		deleteDevice(device):Observable<Device[]>{
			
			 return this.http.delete<Device[]>(`${this.serverUrl}/device/deleteById/${device._id}`,httpOptions)
	      .pipe(
	        tap(device => console.log(`search devices`)),
	        catchError(this.handleError('searchDevice', []))
	      );
		}
		
		sendNotification(notification):Observable<any[]>{
			return this.http.post<Device[]>(`${this.serverUrl}/sendNotification`,JSON.stringify(notification),httpOptions)
	      .pipe(
	        tap(response => console.log(`sendNotification`)),
	        catchError(this.handleError('sendNotification', []))
	      );
		}

		getDeviceById(id):Observable<any>{
			 return this.http.get<Device>(`${this.serverUrl}/getById/${id}`)
	      .pipe(
	        tap(device => console.log(`fetched heroes`)),
	        catchError(this.handleError('getAllDevices', []))
	      );
		}
		
		ApnSendNotification(notification):Observable<any[]>{
			return this.http.post<Device[]>(`${this.serverUrl}/ios/sendNotification`,JSON.stringify(notification),httpOptions)
	      .pipe(
	        tap(response => console.log(`Apn SendNotification`)),
	        catchError(this.handleError('sendNotification', []))
	      );
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
