import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Office } from '../../models/office/Office';
import { InfoService } from '../../info.service';

import { OrgMapInfo } from '../../models/organization/OrgMapInfo';
import * as maptalks from 'maptalks';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { PopupComponent } from '../../popup/popup.component';
@Component({
  selector: 'app-incident-create',
  templateUrl: './incident-create.component.html',
  styleUrls: ['./incident-create.component.css']
})
export class IncidentCreateComponent implements OnInit, AfterViewInit {
  searchAddress;
  step = 0;
  organizations: OrgMapInfo[];
  newIncident = {
    id: '',
    name: '',
    type: '',
    info: '',
    latitude: 0,
    longitude: 0,
    priority: '',
    status: 'Open',
    address: {
      city: '',
      country: '',
      postcode: '',
      state: '',
      state_district: ''
    }
  };
  address;
  incidents = [];
  map;
  extent;
  center;
  mapStatus;
  addressInfo;
  constructor(private service: InfoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newIncident.latitude = -0.131049;
    this.newIncident.longitude = 51.498568;
    this.newIncident.id = '';
    this.newIncident.name = '';
    this.newIncident.type = '';
    this.newIncident.info = '';
    this.service.incident.subscribe(res => this.incidents = res);
    this.service.saveIncident(this.incidents);
  }

  ngAfterViewInit() {
    window.navigator.geolocation.getCurrentPosition((location) => {
      this.newIncident.latitude = location.coords.longitude;
      this.newIncident.longitude  = location.coords.latitude;
      this.service.getMapLocationDataByLL(this.newIncident.latitude, this.newIncident.longitude).
        subscribe((res) => {
          this.addressInfo = res;
          this.map.remove();
          this.loadMap();
          this.mapValues(this.addressInfo, this.newIncident.address);
        });
      }
  );
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  loadMap() {
    this.map = new maptalks.Map('map', {
      center: [this.newIncident.latitude, this.newIncident.longitude],
      zoom: 14,
      centerCross: true,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    });
    const ref = this;
    this.map.on('zoomend moveend', () => {
      this.getStatus();
    });

  }

   getStatus() {
        this.center = this.map.getCenter();
       this.newIncident.latitude =  parseFloat(this.center.x.toFixed(5));
       this.newIncident.longitude = parseFloat(this.center.y.toFixed(5));
       this.service.getMapLocationDataByLL(this.newIncident.latitude, this.newIncident.longitude).
        subscribe((res) => {
          this.addressInfo = res;
          this.mapValues(this.addressInfo, this.newIncident.address);
        });
    }

    saveIncident() {
    console.log(this.incidents);
    console.log(this.newIncident);
    this.incidents.push(this.newIncident);
    this.service.saveIncident(this.incidents);
    this.snackBar.openFromComponent( PopupComponent, {
      duration: 1000,
      data: 'Saved the Incident Data...!'
    });
    this.step = 0;
  }

  changePriority(value) {
    if ( value ) {
      this.newIncident.priority = value;
      console.log('changed priority', value);
    }
  }

  changeIncidentType(value) {
    if ( value) {
      this.newIncident.type = value;
      console.log('changed type', value);
    }
  }
  searchMapLocationBySearchData() {
    this.service.getMapLocationData(this.searchAddress).subscribe((res) => {
      this.address = res;
    });
  }

  moveMap(addresDetails) {
    this.newIncident.latitude =  parseFloat(addresDetails.lon);
    this.newIncident.longitude = parseFloat(addresDetails.lat);
    this.map.remove();
    this.loadMap();
    this.mapValues(addresDetails, this.newIncident.address);
    this.address = [];
  }

  mapValues(fromAddress, toAddress) {
    this.searchAddress = fromAddress.display_name;
    toAddress.city = fromAddress.address.city;
    toAddress.state = fromAddress.address.state;
    toAddress.postcode = fromAddress.address.postcode;
    toAddress.country = fromAddress.address.country;
    toAddress.state_district = fromAddress.address.state_district;
    this.step = 1;
}
}
