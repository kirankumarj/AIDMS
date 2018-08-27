import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';
import * as maptalks from 'maptalks';
import { PopupComponent } from '../popup/popup.component';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {AppState} from '../app.state';
import { Store } from '@ngrx/store';
import * as dashboardAction from '././store-dashboard/dashboard.actions';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  
  openIncidents:any;
  inProgressIncidents:any;
  totalResources:any;
  availableResources:any;
  defectiveResources:any;
  totalAssets:any;
  availableAssets:any;
  defectiveAssets:any;
  liveNewsFeed:any;
  notifications:any;
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

  constructor(private router: Router, private service: InfoService, private store: Store<AppState>) { }
  ngOnInit() {
    this.newOrg.latitude = 78.498;
    this.newOrg.longitude = 17.476;
   
    this.store.dispatch(new dashboardAction.openIncidents());
    this.store.dispatch(new dashboardAction.inProgressIncidents());
    this.store.dispatch(new dashboardAction.totalResources());
    this.store.dispatch(new dashboardAction.availableResources());
    this.store.dispatch(new dashboardAction.defectiveResources());
    this.store.dispatch(new dashboardAction.totalAssets());
    this.store.dispatch(new dashboardAction.availableAssets());
    this.store.dispatch(new dashboardAction.defectiveAssets());
    this.store.dispatch(new dashboardAction.liveNewsFeed());
    this.store.dispatch(new dashboardAction.notifications());
    

    
    this.store.select('openIncidents').subscribe((res)=>{
      this.openIncidents = res.openIncidents;
     });

     this.store.select('inProgressIncidents').subscribe((res)=>{
      this.inProgressIncidents = res.inProgressIncidents;
     });

     this.store.select('totalResources').subscribe((res)=>{
      this.totalResources = res.totalResources;
     });

     this.store.select('availableResources').subscribe((res)=>{
      this.availableResources = res.availableResources;
     });

     this.store.select('defectiveResources').subscribe((res)=>{
      this.defectiveResources = res.defectiveResources;
     });

     this.store.select('totalAssets').subscribe((res)=>{
      this.totalAssets = res.totalAssets;
     });

     this.store.select('availableAssets').subscribe((res)=>{
      this.availableAssets = res.availableAssets;
     });

     this.store.select('defectiveAssets').subscribe((res)=>{
      this.defectiveAssets = res.defectiveAssets;
     });
   
     this.store.select('liveNewsFeed').subscribe((res)=>{
      this.liveNewsFeed = res.liveNewsFeed;
     });

     this.store.select('notifications').subscribe((res)=>{
      this.notifications = res.notifications;
     });

  }
  ngAfterViewInit() {
    window.navigator.geolocation.getCurrentPosition((location) => {
        this.newOrg.latitude = location.coords.longitude;
        this.newOrg.longitude  = location.coords.latitude;
        this.loadMap();
        }
    );
  }

  setStep(index: number) {
    this.step = index;
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

  goto(route) {
    this.router.navigate(['/', route]);
  }
  
}
