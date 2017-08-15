import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Group } from './group.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  groups = "http://localhost:8080/groups";
  group = "http://localhost:8080/group";

  headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Group[]> {
    return this.http.get(this.groups)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  getByCurriculum(id: number): Observable<Group[]> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.groups + "/curriculum", options)
                            .map(this.response2Json)
                            .catch(this.errorHandler);
  }

  create(group: Group): Observable<number> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.group, JSON.stringify(group), options)
                      .map(success => success.status)
                      .catch(this.errorHandler);
  }

  createGroups(groups: Group[]): Observable<number> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.groups, JSON.stringify(groups), options)
                      .map(success => success.status)
                      .catch(this.errorHandler);
  }

  get(id: number): Observable<Group> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.group, options)
                      .map(this.response2Json)
                      .catch(this.errorHandler);
  }

  update(group: Group): Observable<number> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.put(this.group, JSON.stringify(group), options)
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

    return this.http.delete(this.group, options)
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
