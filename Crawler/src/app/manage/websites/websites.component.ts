import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';

@Component({
  selector: 'app-websites',
  styleUrls: ['./websites.component.css'],
  template: `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <body>
  <div class="main">
  <h2>Websites</h2>
  
<input 
    (keyup.enter)="createWebsite(website)" #website
    type="text" class="form-control" placeholder="Enter Websites..">
    <hr/>
    <button class="btn btn-info" (click)="getWebsite(); toggleDisplay();"><span>Show Websites </span></button>
    

    <div *ngIf = "!isShow">
      <ul class="list-group">
        <li 
            *ngFor="let website of websites"
            class="list-group-item">
            {{ website }}
            <button class="btn btn-outline-secondary" (click)="removeWebsite(website)"><i class="fa fa-trash"></i></button>
        </li>
      </ul>
    </div>
  </div>
  </body>
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
    this.websites.push(website.value);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

removeWebsite(website): void {
  this.wordService.deleteWebsite(website).subscribe
  (
    _ => console.log(website + " has been deleted")
  );
  this.websites = this.websites.filter(w => w !== website);
}

  
}
  
  
