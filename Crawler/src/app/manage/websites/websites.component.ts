import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';

@Component({
  selector: 'app-websites',
  styleUrls: ['./websites.component.css'],
  template: `
  <div class="main">
  <h2>Websites</h2>
  
<input 
    (keyup.enter)="createWebsite(website)" #website
    type="text" class="form-control">
    <hr/>
    <button class="btn btn-info" (click)="getWebsite(); toggleDisplay();"><span>Show Websites </span></button>
    

    <div *ngIf = "!isShow">
      <ul class="list-group">
        <li 
            *ngFor="let website of websites"
            class="list-group-item">
            {{ website }}
            <button class="btn btn-outline-secondary" (click)="removeWebsite(website)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
  `

  
})
export class WebsitesComponent implements OnInit {
  websites;
  isShow = true;


  constructor(private wordService: WordsService) {}
  
  ngOnInit() {
    
    }

    getWebsite() {
      this.wordService.getWebsites()
      .subscribe(response => {
        this.websites = response;
      });
    }
  
  
  
  createWebsite(website: HTMLInputElement) {
    this.wordService.postWebsite(website);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

removeWebsite(website): void {
  this.wordService.deleteWebsite(website).subscribe
  (
    _ => console.log(website + " has been deleted")
  );
}
  
}
  
  
