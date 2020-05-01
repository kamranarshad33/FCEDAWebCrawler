import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';


@Component({
  selector: 'app-list',
  /*templateUrl: './list.component.html',*/
  styleUrls: ['./list.component.css'],
  /*
  template: `
  <div *ngIf = "!isShow">
  <div class="row">
  <table>
    <thead>
    <tr>
      <th>Date</th>
      <th>Category</th>
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
  <div class="row">
  <button (click)="runCrawler(); toggleDisplay();"><span>Run Crawler</span></button>
  </div>
  `,
  */
 template: `
 

  <!-- Header -->
  <div *ngIf = "isShow">
    <header class="masthead d-flex">
      <div class="container text-center my-auto">
        <h1 class="mb-1">Crawler Dashboard</h1>
        <h3 class="mb-5">
          <em>Web Crawler created by Team Crawler</em>
        </h3>
        <button class="btn btn-secondary btn-lg" (click)="runCrawler(); toggleDisplay();">Run Crawler</button>
      </div>
      </header>
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
