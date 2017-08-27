import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UtilsService {
  days = "http://localhost:8080/utils/days";
  types = "http://localhost:8080/utils/types";
  levels = "http://localhost:8080/utils/levels";  
  checkIn = "http://localhost:8080/utils/times/checkIn";
  checkOut = "http://localhost:8080/utils/times/checkOut";
  shifts = "http://localhost:8080/utils/shifts";
  semesters = "http://localhost:8080/utils/semesters";
  
  constructor(
    private http: Http
  ) {}

  getDays(): Observable<string[]> {
    return this.http.get(this.days)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getTypes(): Observable<string[]> {
    return this.http.get(this.types)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getShifts(): Observable<string[]> {
    return this.http.get(this.shifts)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getAvailableShifts(id: number, semester: number): Observable<string[]> {
    let headers = new Headers({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    });

    let params = new URLSearchParams();
    params.set('id', id.toString());
    params.set('semester', semester.toString());

    let options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.http.get(this.shifts + '/available', options)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getSemesters(): Observable<number[]> {
    return this.http.get(this.semesters)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getStudyLevels(): Observable<string[]> {
    return this.http.get(this.levels)
              .map(this.response2Json)
              .catch(this.errorHandler);
  }
  getCheckIn(): Observable<string[]> {
    return this.http.get(this.checkIn)
            .map(this.response2Json)
            .catch(this.errorHandler);
  }

  getCheckOut(): Observable<string[]> {
    return this.http.get(this.checkOut)
            .map(this.response2Json)
            .catch(this.errorHandler);
  }

  private response2Json(response: Response): JSON {
    return response.json();
  }

  private errorHandler(error: Response): Observable<any> {
    console.log('There was an error processing the request: ' + error.status);

    return Observable.throw(error.status);
  }
}
