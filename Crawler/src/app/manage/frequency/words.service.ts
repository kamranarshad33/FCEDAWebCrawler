import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



 
@Injectable({
    providedIn: 'root'
})
export class WordsService implements OnInit{

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {

    }

    url: string = "/api/freq";
    url2: string = "/api/UpdateFreq";
  
    getFrequency(){
        return this.httpClient.get(this.url);
    }


    putFrequency(input: HTMLInputElement){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});
        return this.httpClient.put(this.url2, {"frequency": input.value}, 
       {headers: headers}).toPromise().then(puts => {
           console.log(puts);
       });
    }
}
