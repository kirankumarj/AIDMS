import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DashboardService } from './services/dashboard/dashboard.service';

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
  constructor(private locaton: Location,private dashboardService:DashboardService) {
  }
  ngOnInit() {
    this.originalPath = window.location.pathname;
    if (this.originalPath.substr(1) === 'dashboard' || this.originalPath.substr(1) === '') {
      this.linkActive = 'dashboard';
     } else {
      this.linkActive = this.originalPath.substr(1, this.originalPath.indexOf('-') - 1);
    }
    
    this.dashboardService.change.subscribe(linkActive => {
      this.linkActive = linkActive;
    });
  }
  activeClass(linkactive: string) {
        this.linkActive = linkactive;
  }
}
