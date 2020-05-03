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

    url: string = "http://54.80.194.9:5000/keywords"
    url2: string = "http://54.80.194.9:5000/addKeyword";
    url3: string = "http://54.80.194.9:5000/deleteKeyword/";
   


    
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
        const url = `http://54.80.194.9:5000/deleteKeyword/${word}`;
        return this.httpClient.delete<void>(url);
    }
 

}
