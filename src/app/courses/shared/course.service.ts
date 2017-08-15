import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Course } from './course.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
  courses = "http://localhost:8080/courses";
  course = "http://localhost:8080/course";
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Course[]> {
    return this.http.get(this.courses)
                        .map(this.response2Json)
                        .catch(this.errorHandler);
  }

  create(building: Course): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.post(this.course, JSON.stringify(building), options)
                          .map(success => success.status)
                          .catch(this.errorHandler);
  }

  get(id: number): Observable<Course> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.course, options)
                        .map(this.response2Json)
                        .catch(this.errorHandler);
  }

  update(building: Course): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.put(this.course, JSON.stringify(building), options)
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

    return this.http.delete(this.course, options)
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
