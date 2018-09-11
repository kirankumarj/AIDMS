import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  linkActive = 'dashboard';
  presentValue;
  originalPath: string;
  constructor(private locaton: Location) {
  }
  ngOnInit() {
    this.originalPath = window.location.pathname;
    if (this.originalPath.substr(1) === 'dashboard' || this.originalPath.substr(1) === '') {
      this.linkActive = 'dashboard';
     } else {
      this.linkActive = this.originalPath.substr(1, this.originalPath.indexOf('-') - 1);
    }
    console.log(this.linkActive);
  }
  activeClass(linkactive: string) {
        this.linkActive = linkactive;
  }
}
