import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Words } from './words';

 
@Injectable({
    providedIn: 'root'
})
export class WordsService implements OnInit{

    constructor(private http: HttpClient) { }

    ngOnInit() {

    }
    wordsUrl: string = "/api/runCrawler";


    getWords(){
        return this.http.get<Words[]>(this.wordsUrl);
    }

    
}
