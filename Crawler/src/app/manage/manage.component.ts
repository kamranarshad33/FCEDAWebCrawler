import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  isShow = false;
  constructor() { }

  ngOnInit() {
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

}
