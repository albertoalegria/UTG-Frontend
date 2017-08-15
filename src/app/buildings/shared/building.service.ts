import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Building } from './building.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BuildingService {
  buildings = "http://localhost:8080/buildings";
  building = "http://localhost:8080/building";
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Building[]> {
    return this.http.get(this.buildings)
                        .map(this.response2Json)
                        .catch(this.errorHandler);
  }

  create(building: Building): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.post(this.building, JSON.stringify(building), options)
                          .map(success => success.status)
                          .catch(this.errorHandler);
  }

  get(id: number): Observable<Building> {
    let params = new URLSearchParams();
    params.set('id', id.toString());
    let options = new RequestOptions({
      headers: this.headers,
      params: params
    });

    return this.http.get(this.building, options)
                        .map(this.response2Json)
                        .catch(this.errorHandler);
  }

  update(building: Building): Observable<number> {
    let options = new RequestOptions({
      headers: this.headers
    });

    return this.http.put(this.building, JSON.stringify(building), options)
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

    return this.http.delete(this.building, options)
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
