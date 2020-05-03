import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';

@Component({
  selector: 'app-frequency',
  styleUrls: ['./frequency.component.css'],
  template: `
  <div class="main">
  <h2>Keyword Frequency Setting</h2>
  <p>Please enter a whole integer. This will be the amount of times the keyboard must be detected - for example, if you'd like a keyword to show up a minimum of three times, then enter '3'.</p>
  
<input 
    (keyup.enter)="putFrequency(frequency)" #frequency
    type="text" class="form-control">
    <hr/>
	<p> The current frequency is {{ frequency }}</p>
  </div>
  `

  
})
export class FrequencyComponent implements OnInit {


  constructor(private wordService: WordsService) {}
  
  ngOnInit() {
    
    }

    getFrequency(frequency: String) {
      this.wordService.getFrequency()
      .subscribe(response => {
        this.frequency = response;
      });
    }
  
  
  putFrequency(frequency: HTMLInputElement) {
    this.wordService.putFrequency(frequency);
  }
  
}
  
  
