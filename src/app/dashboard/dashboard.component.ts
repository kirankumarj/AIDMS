import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InfoService } from '../info.service';
import * as maptalks from 'maptalks';
import { PopupComponent } from '../popup/popup.component';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {AppState} from '../app.state';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

 
  step = 0;
  searchAddress;
  address;
  map;
  extent;
  ex;
  mapStatus;
  center;
  addressInfo;
  addressLocation = [];
  newOrg = {
    name: '',
    latitude: 0,
    longitude: 0,
    type: '',
    info: '',
    address: {
      city: '',
      country: '',
      postcode: '',
      state: '',
      state_district: ''
    }
  };

  constructor(private service: InfoService) { }
  ngOnInit() {
    this.newOrg.latitude = 78.498;
    this.newOrg.longitude = 17.476;
  }
  ngAfterViewInit() {
    window.navigator.geolocation.getCurrentPosition((location) => {
        this.newOrg.latitude = location.coords.longitude;
        this.newOrg.longitude  = location.coords.latitude;
        this.loadMap();
        }
    );
  }

  loadMap() {
    this.map = new maptalks.Map('map', {
      center: [this.newOrg.latitude, this.newOrg.longitude],
      zoom: 12,
      centerCross: true,
      zoomControl: {
        'position'  : 'top-right'
      },
      baseLayer: new maptalks.TileLayer('base', {
        // urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        // subdomains: ['a', 'b' , 'c' , 'd'],
        // attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b' , 'c'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
    });
    this.map.on('zoomend moveend', () => {
          this.getStatus();
    });
}
getStatus() {
  this.addressInfo = '';
  this.step = 2;
  this.searchAddress = '';
  this.newOrg.address.city = '';
  this.newOrg.address.state = '';
  this.newOrg.address.postcode = '';
  this.newOrg.address.country = '';
  this.newOrg.address.state_district = '';
  this.center = this.map.getCenter();
  this.newOrg.latitude =  parseFloat(this.center.x.toFixed(5));
  this.newOrg.longitude = parseFloat(this.center.y.toFixed(5));
  this.service.getMapLocationDataByLL(this.newOrg.latitude, this.newOrg.longitude).
    subscribe((res) => {
      this.addressInfo = res;
      this.mapValues(this.addressInfo, this.newOrg.address);
    });
}

mapValues(fromAddress, toAddress) {
    this.searchAddress = fromAddress.display_name;
    toAddress.city = fromAddress.address.city;
    toAddress.state = fromAddress.address.state;
    toAddress.postcode = fromAddress.address.postcode;
    toAddress.country = fromAddress.address.country;
    toAddress.state_district = fromAddress.address.state_district;
    this.step = 2;
}
  moveMap(addresDetails) {
    this.newOrg.latitude =  parseFloat(addresDetails.lon);
    this.newOrg.longitude = parseFloat(addresDetails.lat);
    this.map.remove();
    this.loadMap();
    this.mapValues(addresDetails, this.newOrg.address);
    this.address = [];
  }
  
  searchMapLocationBySearchData() {
    this.service.getMapLocationData(this.searchAddress).subscribe((res) => {
      this.address = res;
    });
  }
  
}
