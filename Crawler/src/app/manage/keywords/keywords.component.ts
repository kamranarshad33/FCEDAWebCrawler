import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';



 
@Component({
  selector: 'app-keywords',
  styleUrls: ['./keywords.component.css'],
  template: 
  `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <body>
    <div class="main">
      <h2>Keywords</h2>
      <input 
      (keyup.enter)="createKeyWord(keyword)" #keyword
      type="text" class="form-control" placeholder="Enter Keywords..">
    
      <hr/>
        <button class="btn btn-info" (click)="getWord(); toggleDisplay();"><span>Show Keywords</span></button>
        <div *ngIf = "!isShow">
          <ul class="list-group">
            <li 
              *ngFor="let keyword of keywords;"
              class="list-group-item">
              {{ keyword }}
              <button class="btn btn-outline-secondary" (click)="deleteWord(keyword)"><i class="fa fa-trash"></i></button>
            </li>
          </ul>
        </div>
    </div>
    <br />
    </body>

  `
  
})

export class KeywordsComponent implements OnInit {
keywords;
isShow = true;


constructor(private wordService: WordsService) {}

ngOnInit() {

}

getWord() {
  this.wordService.getWords()
  .subscribe(response => {
    this.keywords = response;
  });
}

createKeyWord(keyword: HTMLInputElement) {
  this.wordService.postKeyWord(keyword);
  this.keywords.push(keyword.value);
}

toggleDisplay() {
  this.isShow = !this.isShow;
}

deleteWord(word): void {
  this.wordService.deleteKeyWord(word).subscribe
  (
    _ => console.log(word + " has been deleted")
  );
  this.keywords = this.keywords.filter(k => k !== word);
}


}



