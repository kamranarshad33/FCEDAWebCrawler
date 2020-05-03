import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Words } from './words';
import { Observable } from 'rxjs';

 
@Injectable({
    providedIn: 'root'
})
export class WordsService implements OnInit{

    constructor(private http: HttpClient) { }

    ngOnInit() {

    }

    url: string = "http://54.80.194.9:5000/startCrawler";

    getWords():Observable<Words[]>{
        return this.http.get<Words[]>(this.url);
    }

}
