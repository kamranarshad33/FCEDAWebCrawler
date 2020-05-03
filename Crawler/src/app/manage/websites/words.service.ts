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

    url: string = 'http://54.80.194.9:5000/websites';
    url2: string = "http://54.80.194.9:5000/addWebsite";

    
    getWebsites(){
        return this.httpClient.get(this.url);
    }


    postWebsite(input: HTMLInputElement){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});
        return this.httpClient.post(this.url2, {"website": input.value}, 
       {headers: headers}).toPromise().then(posts => {
           console.log(posts);
       });
    }

    deleteWebsite(website): Observable<void> {
        const url = `http://54.80.194.9:5000/deleteWebsite/${website}`;
        return this.httpClient.delete<void>(url);
    }
 
}
