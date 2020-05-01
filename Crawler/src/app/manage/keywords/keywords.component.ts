import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';
import { Keyword } from './keyword';


 
@Component({
  selector: 'app-keywords',
  styleUrls: ['./keywords.component.css'],
  template: 
  `
  <div class="main">
    <h2>Keywords</h2>
  
    <input 
      (keyup.enter)="createKeyWord(keyword)" #keyword
      type="text" class="form-control">
    

      <hr/>
    <button class="btn btn-info" (click)="getWord(); toggleDisplay();"><span>Show Keywords </span></button>
    <div *ngIf = "!isShow">
      <ul class="list-group">
        <li 
          *ngFor="let keyword of keywords;"
          class="list-group-item">
          {{ keyword }}
          <button class="btn btn-outline-secondary" (click)="deleteWord(keyword)">Delete</button>
        </li>
      </ul>
  </div>
  <br />
</div>
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
}

toggleDisplay() {
  this.isShow = !this.isShow;
}

deleteWord(word): void {
  this.wordService.deleteKeyWord(word).subscribe
  (
    _ => console.log(word + " has been deleted")
  );
}


}



