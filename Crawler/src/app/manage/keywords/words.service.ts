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

    url: string = "/api/keywords"
    url2: string = "/api/addKeyword";
    url3: string = "/api/deleteKeyword/";
   


    
    getWords(){
        return this.httpClient.get(this.url);
    }




    postKeyWord(input: HTMLInputElement){
        const headers = new HttpHeaders
        ({ 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
         return this.httpClient.post(this.url2, {"keyword": input.value}, 
        {headers: headers}).toPromise().then
        (
            posts => 
            {
                console.log(posts);
            }
        );
         
       }

    deleteKeyWord(word): Observable<void> {
        const url = `/api/deleteKeyword/${word}`;
        return this.httpClient.delete<void>(url);
    }
 

}
