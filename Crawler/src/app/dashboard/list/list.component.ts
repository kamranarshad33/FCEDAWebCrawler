import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';


@Component({
  selector: 'app-list',
  //templateUrl: './list.component.html'
  styleUrls: ['./list.component.css'],
  template: `
  <!-- Header -->
  <div *ngIf = "isShow">
    <header class="masthead d-flex">
      <div class="container text-center my-auto">
        <h1 class="mb-1">Crawler Dashboard</h1>
        <h3 class="mb-5">
          <em>Web Crawler created by Team Crawler</em>
        </h3>
        <button class="btn btn-secondary btn-lg" (click)="runCrawler(); toggleDisplay();">Access Dashboard</button>
      </div>
      </header>
  </div>  
	<div>
		<p>The crawler runs each morning at 6:00 AM Eastern Standard Time.</p>
	</div>
  <div *ngIf = "!isShow">
  <div class="row">
  <table>
    <thead>
    <tr>
      <th>Date</th>
      <th>Keyword</th>
      <th>Link</th>
      <th>Abstract</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let word of words;">
      <td>{{ word.date }}</td>
      <td>{{ word.category }}</td>
      <td><a [href] = "word.link" target="_blank">{{ word.link }}</a></td>
      <td>{{ word.abstract }}</td>
    </tr>
    </tbody>
  </table>
  </div>
  </div>
 
`
  
})
export class ListComponent implements OnInit {

public words = [];
isShow = true;

  constructor(private _wordsService: WordsService) {}


  ngOnInit(){
  
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  runCrawler() {
    this._wordsService.getWords()
      .subscribe(data => this.words = data);
  }
 

}
