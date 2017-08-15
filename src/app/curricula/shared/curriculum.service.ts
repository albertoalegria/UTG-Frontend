import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Curriculum } from './curriculum.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CurriculumService {
  curricula = "http://localhost:8080/curricula";
  curriculum = "http://localhost:8080/curriculum";
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Curriculum[]> {
    return this.http.get(this.curricula)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getByCareer(id: number): Observable<Curriculum[]> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.curricula + '/career', options)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  create(curriculum: Curriculum): Observable<number> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.curriculum, JSON.stringify(curriculum), options)
                          .map(success => success.status)
                          .catch(this.errorHandler);
  }

  get(id: number): Observable<Curriculum> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.curriculum, options)
                        .map(this.response2Json)
                        .catch(this.errorHandler);
  }

  update(curriculum: Curriculum): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.put(this.curriculum, JSON.stringify(curriculum), options)
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

    return this.http.delete(this.curriculum, options)
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
