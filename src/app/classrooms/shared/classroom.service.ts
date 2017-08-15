import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';

import { Classroom } from './classroom.model';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClassroomService {
    classrooms = "http://localhost:8080/classrooms";
    classroom = "http://localhost:8080/classroom";

    headers = new Headers({
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    });

    constructor(
        private http: Http
    ) {}

    getAll(): Observable<Classroom[]> {
        return this.http.get(this.classrooms)
                            .map(this.response2Json)
                            .catch(this.errorHandler);
    }

    getByBuilding(id: number): Observable<Classroom[]> {
        let params = new URLSearchParams();
        params.set('id', id.toString());

        let options = new RequestOptions({
            headers: this.headers,
            params: params
        });
        
        return this.http.get(this.classrooms + '/building', options)
                            .map(this.response2Json)
                            .catch(this.errorHandler);
    }

    create(classroom: Classroom): Observable<number> {
        console.log(classroom);

        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.classroom, JSON.stringify(classroom), options)
                            .map(success => success.status)
                            .catch(this.errorHandler);
    }
    
    get(id: number): Observable<Classroom> {
        let params = new URLSearchParams();
        params.set('id', id.toString());

        let options = new RequestOptions({
            headers: this.headers,
            params: params
        });

        return this.http.get(this.classroom, options)
                            .map(this.response2Json)
                            .catch(this.errorHandler);
    }
    
    update(classroom: Classroom): Observable<number> {
        let options = new RequestOptions({
            headers: this.headers
        });

        return this.http.put(this.classroom, JSON.stringify(classroom), options)
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

        return this.http.delete(this.classroom, options)
                            .map(success => success.status)
                            .catch(this.errorHandler);
    }

    

    private response2Json(response: Response): JSON {
        return response.json();
    }

    private errorHandler(error: Response): Observable<any> {
        console.log('There was an error processing the request ' + error.status);

        return Observable.throw(error.status);
    }
}