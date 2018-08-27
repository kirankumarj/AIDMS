import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InfoService } from '../../info.service';
import { OrgMapInfo } from '../../models/organization/OrgMapInfo';
import { MatSnackBar } from '@angular/material';

import * as maptalks from 'maptalks';
import { PopupComponent } from '../../popup/popup.component';
import { OrganizationService } from '../../services/organization.service';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import { AddResource } from '../store/resource.actions';
import { Resource } from '../../models/resource';
import { GetAllOrganization } from '../../org/store/org.actions';


@Component({
  selector: 'app-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.css']
})

export class ResourceCreateComponent implements OnInit, AfterViewInit {
  resurce: Resource;
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
  newResource = {
    org: '',
    dept: '',
    job: '',
    email: '',
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
  organizationsList = [];
  resourcesList = [];
  constructor(private service: InfoService, private snackBar: MatSnackBar,
    private organizationService: OrganizationService ,
    private store: Store<AppState>
) { }
  ngOnInit() {
    this.newResource.latitude = 78.498;
    this.newResource.longitude = 17.476;
    if (environment.isDataAvailableInRealService) {
      console.log('Hit the service :: Get the all Org Details ');
      this.getAllOrganizations();
    } else {
      console.log('Mock Data :: Get the all Org Details ');
      this.service.mapLocation.subscribe(res => this.organizationsList = res);
      this.service.saveOrganization(this.organizationsList);
    }
  }
  ngAfterViewInit() {
    window.navigator.geolocation.getCurrentPosition((location) => {
        this.newResource.latitude = location.coords.longitude;
        this.newResource.longitude  = location.coords.latitude;
        this.loadMap();
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
      center: [this.newResource.latitude, this.newResource.longitude],
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
  this.newResource.address.city = '';
  this.newResource.address.state = '';
  this.newResource.address.postcode = '';
  this.newResource.address.country = '';
  this.newResource.address.state_district = '';
  this.center = this.map.getCenter();
  this.newResource.latitude =  parseFloat(this.center.x.toFixed(5));
  this.newResource.longitude = parseFloat(this.center.y.toFixed(5));
  this.service.getMapLocationDataByLL(this.newResource.latitude, this.newResource.longitude).
    subscribe((res) => {
      this.addressInfo = res;
      this.mapValues(this.addressInfo, this.newResource.address);
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
    this.newResource.latitude =  parseFloat(addresDetails.lon);
    this.newResource.longitude = parseFloat(addresDetails.lat);
    this.map.remove();
    this.loadMap();
    this.mapValues(addresDetails, this.newResource.address);
    this.address = [];
  }

  saveResource() {
    if (environment.isDataAvailableInRealService) {
      console.log('Hit Service:: Create Resource ', this.newResource);
      this.createresource();
    } else {
      console.log('Mock Data :: Create Resource ', this.newResource);
        this.resourcesList.push(this.newResource);
        this.service.saveResource(this.resourcesList);
        this.snackBar.openFromComponent(PopupComponent, {
        duration: 1000,
        data: 'Saved Data...!'
      });
    this.step = 0;
    }
  }
  searchMapLocationBySearchData() {
    this.service.getMapLocationData(this.searchAddress).subscribe((res) => {
      this.address = res;
    });
  }

  createresource() {
    this.store.dispatch(new AddResource(this.newResource));
    this.newResource.name = '';
    this.newResource.org = '';
    this.newResource.email = '';
    this.newResource.job = '';
    this.newResource.address.city = '';
    this.newResource.address.country = '';
    this.newResource.address.postcode = '';
    this.newResource.address.state = '';
    this.newResource.address.state_district = '';
    this.step = 0;
  }

  getAllOrganizations() {
    this.store.dispatch(new GetAllOrganization());
    this.store.select('organizations').subscribe((res) => {
      this.organizationsList = res.data;
    }, error => {
      this.snackBar.openFromComponent(PopupComponent, {
        duration: 3000,
        // data: 'Service Error...!'
      });
      this.step = 0;
    });
  }
}

