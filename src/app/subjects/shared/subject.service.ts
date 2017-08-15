import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Subject } from './subject.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubjectService {
  subjects = "http://localhost:8080/subjects";
  subject = "http://localhost:8080/subject";

  headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Subject[]> {
    return this.http.get(this.subjects)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getByCurriculumAndSemester(id: number, semester: number): Observable<Subject[]> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    params.set('semester', semester.toString());

    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.subjects + "/curriculumandsemester", options)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  create(subject: Subject): Observable<number> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.subject, JSON.stringify(subject), options)
                      .map(success => success.status)
                      .catch(this.errorHandler);
  }

  get(id: number): Observable<Subject> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.subject, options)
                .map(this.response2Json)
                .catch(this.errorHandler);
  }

  update(subject: Subject): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.put(this.subject, JSON.stringify(subject), options)
                      .map(success => success.status)
                      .catch(this.errorHandler);
  }

  delete(id: number): Observable<number> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.delete(this.subject, options)
                            .map(success => success.status)
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
