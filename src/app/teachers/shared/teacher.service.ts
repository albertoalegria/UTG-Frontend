import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Teacher } from './teacher.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TeacherService {
    teachers: string = "http://localhost:8080/teachers";
    teacher: string = "http://localhost:8080/teacher";
    headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    constructor(
        private http: Http
    ) { }

    getAll(): Observable<Teacher[]> {
        return this.http.get(this.teachers).map(this.response2Json).catch(this.errorHandler);
    }

    create(teacher: Teacher): Observable<number> {
        let options = new RequestOptions({
            headers: this.headers
        });

        return this.http.post(this.teacher, JSON.stringify(teacher), options).map(success => success.status).catch(this.errorHandler);
    }

    get(id: number): Observable<Teacher> {
        let params = new URLSearchParams();
        params.set('id', id.toString());

        let options = new RequestOptions({
            headers: this.headers,
            params: params
        });

        return this.http.get(this.teacher, options).map(this.response2Json).catch(this.errorHandler);
    }

    update(teacher: Teacher): Observable<number> {
        let options = new RequestOptions({
            headers: this.headers
        });

        return this.http.put(this.teacher, JSON.stringify(teacher), options).map(success => success.status).catch(this.errorHandler);
    }

    delete(id: number): Observable<number>{
        let params = new URLSearchParams();
        params.set('id', id.toString());

        let options = new RequestOptions({
            headers: this.headers,
            params: params
        });

        return this.http.delete(this.teacher, options).map(success => success.status).catch(this.errorHandler);
    }

    private response2Json(response: Response): JSON {
        return response.json();
    }

    private errorHandler(error: Response): Observable<any> {
        console.log('There was an error processing the request: ' + error.status);

        return Observable.throw(error.status);
    }
}