import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from "@angular/core";
import { ShelterMapInfo } from "src/app/models/shelter/ShelterMapInfo";
import { InfoService } from "src/app/info.service";
import { MatSnackBar } from '@angular/material';

import * as maptalks from 'maptalks';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, ShelterState } from '../../app.state';
import { ShelterService } from "src/app/services/shelter.service";
import { PopupComponent } from "src/app/popup/popup.component";
import * as fromReducer from '../store/shelter.reducers';
import * as fromActions from '../store/shelter.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shelter-create',
  templateUrl: './shelter-create.component.html',
  styleUrls: ['./shelter-create.component.css']
})
export class ShelterCreateComponent implements OnInit, AfterViewInit {
  shelterForm: FormGroup;
  step = 0;
  searchAddress;
  shelters: ShelterMapInfo[];
  address;
  map;
  extent;
  ex;
  mapStatus;
  center;
  addressInfo;
  addressLocation = [];
  newShleter = {
    id:null,
    name: '',
    latitude: 0,
    longitude: 0,
    type: '',
    status: '',
    maxCapacity: '',
    currentOccupancy: '',
    contact: '',
      city: '',
      country: '',
      postcode: '',
      state: '',
      state_district: ''
    
  };
  sheltersList = [];

  sheltertypeList = [
    {
      id: 1,
      name: 'Permanent'
    },
    {
      id: 2,
      name: 'Temporary'
    }
  ];

  statusList = [
    {
      id: 1,
      name: 'Open'
    },
    {
      id: 2,
      name: 'Close'
    }
  ];

  shelters$: Observable<ShelterMapInfo[]>;
	message$: Observable<any>;

  constructor(private service: InfoService, private snackBar: MatSnackBar,
    private shelterService: ShelterService,
    private store: Store<ShelterState>,private formBuilder: FormBuilder
  ) {

    this.shelters$ = store.select(fromReducer.getAllShelters);
		this.message$ = store.select(fromReducer.getMessage);
   }

  ngOnInit() {

    this.newShleter.latitude = 78.498;
    this.newShleter.longitude = 17.476;
    if (environment.isDataAvailableInRealService) {
      console.log('Hit the service :: Get the all Org Details ');
      this.getAllShelters();
    } else {
      console.log('Mock Data :: Get the all Org Details ');
      this.service.mapLocation.subscribe(res => this.sheltersList = res);
      this.service.saveShelter(this.sheltersList);
    }

  }
  ngAfterViewInit(): void {
    window.navigator.geolocation.getCurrentPosition((location) => {
      this.newShleter.latitude = location.coords.longitude;
      this.newShleter.longitude = location.coords.latitude;
      this.loadMap();
    }
    );
  }
  get f() { return this.shelterForm.controls; }

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
      center: [this.newShleter.latitude, this.newShleter.longitude],
      zoom: 12,
      centerCross: true,
      zoomControl: {
        'position': 'top-right'
      },
      baseLayer: new maptalks.TileLayer('base', {
        // urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        // subdomains: ['a', 'b' , 'c' , 'd'],
        // attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c'],
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
    this.newShleter.city = '';
    this.newShleter.state = '';
    this.newShleter.postcode = '';
    this.newShleter.country = '';
    this.newShleter.state_district = '';
    this.center = this.map.getCenter();
    this.newShleter.latitude = parseFloat(this.center.x.toFixed(5));
    this.newShleter.longitude = parseFloat(this.center.y.toFixed(5));
    this.service.getMapLocationDataByLL(this.newShleter.latitude, this.newShleter.longitude).
      subscribe((res) => {
        console.log("response"+JSON.stringify(res));
        this.addressInfo = res;
        this.mapValues(this.addressInfo, this.newShleter);
      });
  }

  mapValues(fromAddress, toAddress) {
    this.searchAddress = fromAddress.address.display_name;
    toAddress.city = fromAddress.address.city;
    toAddress.state = fromAddress.address.state;
    toAddress.postcode = fromAddress.address.postcode;
    toAddress.country = fromAddress.address.country;
    toAddress.state_district = fromAddress.address.state_district;
    this.step = 2;
    alert(toAddress.postcode);
  }

  moveMap(addresDetails) {
    this.newShleter.latitude = parseFloat(addresDetails.lon);
    this.newShleter.longitude = parseFloat(addresDetails.lat);
    this.map.remove();
    this.loadMap();
    this.mapValues(addresDetails, this.newShleter);
    this.address = [];
  }

  saveShelter() {
    if (environment.isDataAvailableInRealService) {
      console.log('Hit Service:: Create Org ', this.newShleter);
      //this.createShelter();
      this.CreatedShelter(this.newShleter);
    } else {
      console.log('Mock Data :: Create Org ', this.newShleter);
      this.sheltersList.push(this.newShleter);
      //this.service.saveShelter(this.sheltersList);
      
      this.snackBar.openFromComponent(PopupComponent, {
        duration: 1000,
        data: 'Saved Data...!'
      });
      this.step = 0;
    }
  }

  CreatedShelter(shelter: ShelterMapInfo){
    this.store.dispatch(new fromActions.AddShelter(shelter));
    this.snackBar.openFromComponent(PopupComponent, {
        duration: 1000,
        data: 'Saved Data...!'
      });
      this.step = 0;
	}

  searchMapLocationBySearchData() {
    this.service.getMapLocationData(this.searchAddress).subscribe((res) => {
      this.address = res;
    });
  }

  createShelter() {
    // this.store.dispatch(new AddOrganization(this.newOrg));
    this.shelterService.createShelter(this.newShleter).subscribe((res) => {
      // console.log(res);
      if (res.id) {
        this.snackBar.openFromComponent(PopupComponent, {
          duration: 1000,
          data: 'Saved Data...!'
        });
        this.step = 0;
        this.newShleter.name = '';
        this.newShleter.type = '';
        this.newShleter.status = '';
        this.newShleter.maxCapacity = '';
        this.newShleter.currentOccupancy = '';
        this.newShleter.contact = '';
      }
    },
      error => {
        this.snackBar.openFromComponent(PopupComponent, {
          duration: 2000,
          data: 'Service Error...!'
        });
        this.step = 0;
      });
  }

  getAllShelters() {
    this.shelterService.getAllShelters().subscribe((res) => {
      this.sheltersList = res;
      // console.log(this.organizationsList);
    },
      error => {
        this.snackBar.openFromComponent(PopupComponent, {
          duration: 3000,
          data: 'Service Error...!'
        });
        this.step = 0;
      });
  }


}
