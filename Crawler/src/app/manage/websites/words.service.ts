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

    url: string = '/api/websites';
    url2: string = "/api/addWebsite";

    
    getWebsites(){
        return this.httpClient.get(this.url);
    }


    postWebsite(input: HTMLInputElement){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});
		const inputvalue = input.value;
		const newvalue = inputvalue.toString();
		const finalvalue = newvalue.replace(/(^\w+:|^)\/\//, '');
        return this.httpClient.post(this.url2, {"website": finalvalue}, 
       {headers: headers}).toPromise().then(posts => {
           console.log(posts);
       });
    }

    deleteWebsite(website): Observable<void> {
        const url = `/api/deleteWebsite/${website}`;
        return this.httpClient.delete<void>(url);
    }
 
}
