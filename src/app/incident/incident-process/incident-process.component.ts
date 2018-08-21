import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incident-process',
  templateUrl: './incident-process.component.html',
  styleUrls: ['./incident-process.component.css']
})
export class IncidentProcessComponent implements OnInit {
  resources: string[] = ['Sambi', 'Madhu', 'Kiran', 'Jai'];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  constructor() { }

  ngOnInit() {
  }

}
