import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Career } from './career.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CareerService {
  careers = "http://localhost:8080/careers";
  career = "http://localhost:8080/career";
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Career[]> {
    return this.http.get(this.careers)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  create(career: Career): Observable<number> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.career, JSON.stringify(career), options)
                          .map(success => success.status)
                          .catch(this.errorHandler);
  }

  get(id: number): Observable<Career> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.career, options)
                        .map(this.response2Json)
                        .catch(this.errorHandler);
  }

  update(career: Career): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.put(this.career, JSON.stringify(career), options)
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

    return this.http.delete(this.career, options)
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
