import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';
import {DashboardService } from '../services/dashboard/dashboard.service'
import * as maptalks from 'maptalks';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {AppState} from '../app.state';
import { Store } from '@ngrx/store';
import * as dashboardAction from '././store-dashboard/dashboard.actions';
import { OrgMapInfo } from '././../models/organization/OrgMapInfo';
import X2JS from 'node-x2js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  linkActive = '';
  openIncidents:any;
  inProgressIncidents:any;
  totalResources:any;
  availableResources:any;
  allocatedResources:any;
  totalAssets:any;
  availableAssets:any;
  defectiveAssets:any;
  liveNewsFeedFB:any;
  liveNewsFeedTW:any;
  notifications:any;
  step = 0;

  searchAddress;
  address;
  layer;
  map;
  dataSource;
  dashboardMapAssertsList;
  mapSelcted = '';
  marker;
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

  constructor(private router: Router, private service: InfoService, private dashboardService: DashboardService, private store: Store<AppState>) { }
  ngOnInit() {
    this.newOrg.latitude = 78.498;
    this.newOrg.longitude = 17.476;

    this.service.dashboardMapAssert.subscribe(res => this.dashboardMapAssertsList = res);
    this.service.saveDashboardMapAssertsList(this.dashboardMapAssertsList);

    this.dataSource = new MatTableDataSource<OrgMapInfo>(this.dashboardMapAssertsList);

    //read RSS Feed to get notifications
    this.dashboardService.getRssFeed().subscribe(result => {
    var x2js = new X2JS();
    var jsonObj = x2js.xml_str2json(result);
    this.notifications = jsonObj.feed.entry;
    }, error => {
      console.log("Notifications Error::::",error);
    })

    //read Facebook Feed to get livenewsfeed
    this.dashboardService.getFacebookFeed().subscribe(res => {
      this.liveNewsFeedFB = res;
      }, error => {
      console.log("Facebook Error::::",error);
    })

    //read Twitter Feed to get livenewsfeed
    this.dashboardService.getTwitterFeed().subscribe(res => {
      this.liveNewsFeedTW = res;
      }, error => {
      console.log("Twitter Error::::",error);
    })

    this.store.dispatch(new dashboardAction.openIncidents());
    this.store.dispatch(new dashboardAction.inProgressIncidents());
    this.store.dispatch(new dashboardAction.totalResources());
    this.store.dispatch(new dashboardAction.availableResources());
    this.store.dispatch(new dashboardAction.allocatedResources());
    this.store.dispatch(new dashboardAction.totalAssets());
    this.store.dispatch(new dashboardAction.availableAssets());
    this.store.dispatch(new dashboardAction.defectiveAssets());
    //this.store.dispatch(new dashboardAction.liveNewsFeed());
    //this.store.dispatch(new dashboardAction.notifications());
    

    
    this.store.select('openIncidents').subscribe((res)=>{
      this.openIncidents = res.openIncidents;
     });

     this.store.select('inProgressIncidents').subscribe((res)=>{
      this.inProgressIncidents = res.inProgressIncidents;
     });

     this.store.select('totalResources').subscribe((res)=>{
      this.totalResources = res.totalResources.count;
     });

     this.store.select('availableResources').subscribe((res)=>{
      this.availableResources = res.availableResources;
     });

     this.store.select('allocatedResources').subscribe((res)=>{
      this.allocatedResources = res.allocatedResources;
     });

     this.store.select('totalAssets').subscribe((res)=>{
      this.totalAssets = res.totalAssets.count;
     });

     this.store.select('availableAssets').subscribe((res)=>{
      this.availableAssets = res.availableAssets;
     });

     this.store.select('defectiveAssets').subscribe((res)=>{
      this.defectiveAssets = res.defectiveAssets;
     });
    /*
     this.store.select('liveNewsFeed').subscribe((res)=>{
      this.liveNewsFeed = res.liveNewsFeed;
     });
    
     this.store.select('notifications').subscribe((res)=>{
      this.notifications = res.notifications;
     });
    */
    
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
  this.mapInitialization();
  const ref  = this;

   this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
   this.applyMarkers(this.dashboardMapAssertsList);

   // vertical one on top right
   new maptalks.control.Toolbar({
     'vertical' : true,
     'position' : 'top-right',
     'items'     : [{
       item: 'Select',
       click : function () { },
       children : [{
         item: 'Hospitals',
         click : function () {
           ref.mapSelcted = 'hospital';
           ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
           ref.map.removeLayer(ref.layer);
           ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
           ref.applyMarkers(ref.dataSource.filteredData);
          }
       }, {
         item: 'Fire-Stations',
         click : function () {
           ref.mapSelcted = 'firestation';
           ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
           console.log(ref.dataSource.filter);
           ref.map.removeLayer(ref.layer);
           ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
           ref.applyMarkers(ref.dataSource.filteredData);
         }
       }, {
         item: 'Airports',
         click : function () {
           ref.mapSelcted = 'airport';
           ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
           ref.map.removeLayer(ref.layer);
           ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
           ref.applyMarkers(ref.dataSource.filteredData);
         }
       }, {
           item: 'all',
           click : function () {
             ref.mapSelcted = '';
             ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
             ref.map.removeLayer(ref.layer);
           ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
           ref.applyMarkers(ref.dashboardMapAssertsList);
           }
       }]
     }, {
       item: '---',
       click : function () {
        ref.mapSelcted = '';
        ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
        ref.map.removeLayer(ref.layer);
        ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
        ref.applyMarkers(ref.dashboardMapAssertsList);
      }
     }]
   })
   .addTo(this.map);
 }

 mapInitialization() {
  if(this.map !== undefined) {
    this.map.remove();
  }
  this.map = new maptalks.Map('map', {
    center: [-0.113049, 51.498568],
    zoom: 14,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b' , 'c'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
  });
  
}

applyMarkers(incident) {

  incident.forEach(element => {
    this.marker = new maptalks.Marker(
      [element.latitude, element.longitude],
      {
        'properties' : {
          'name' : element.name
        },
        symbol : [
          {
            'markerFile'   : '../../assets/icons/dashboard/' + element.type + '.png',
            'markerWidth'  : 30,
            'markerHeight' : 40
          },
          {
            'textFaceName' : 'sans-serif',
            'textName' : '{name}',
            'textSize' : 14,
            'textDy'   : 24
          }
        ]
      }
    ).addTo(this.layer);
    this.marker.setInfoWindow({
      'title'     : element.name,
      'content'   : element.info,
    });
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
    this.loadMap();
    this.mapValues(addresDetails, this.newOrg.address);
    this.address = [];
  }
  
  searchMapLocationBySearchData() {
    this.service.getMapLocationData(this.searchAddress).subscribe((res) => {
      this.address = res;
    });
  }

  goto(route, linkActive: string) {
    this.dashboardService.change.emit(linkActive);
    this.router.navigate(['/', route]);
  }
  
}
