import { Component, OnInit ,  AfterViewChecked, AfterViewInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { InfoService } from '../../info.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import * as maptalks from 'maptalks';
import { OverlayDeleteComponent } from '../../popup/overlay-delete/overlay-delete.component';
import { OverlayUpdateOrgComponent } from '../../popup/overlay-update-org/overlay-update-org.component';
import { PopupComponent } from '../../popup/popup.component';

import { environment } from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../app.state';
import * as resourceActions from '../store/resource.actions';
import { ResourceService } from '../../services/resource.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})

export class ResourceViewComponent implements OnInit , AfterViewInit {
  organizationsList: Observable<any[]>;
  displayedColumns: string[] = ['name', 'type', 'info', 'action'];
  dataSource;
  resources = [];
  mapSelcted = '';
  incidentLocations = [];
  layer;
  map;
  marker;
  resourceIndex;
  action;
  filterSize = false;
  updateData = {
    id: '',
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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: InfoService, private matDialog: MatDialog, private snackBar: MatSnackBar,
    private resourceService: ResourceService,
    private store: Store<AppState> ) {
  }

  ngOnInit() {
    this.store.dispatch(new resourceActions.GetAllResources());
    // console.log("From the ngOnInit");
    // console.log(this.store);
  }
  ngAfterViewInit() {
    if (environment.isDataAvailableInRealService) {
      console.log('Hit the service :: Get the all resources Details ');
      this.getAllResources();
    } else {
      console.log('Mock Data :: Get the all resources Details ');
      this.service.mapLocation.subscribe(res => this.resources = res);
      this.service.saveResource(this.resources);
      this.dataSource = new MatTableDataSource<any>(this.resources);
      this.dataSource.paginator = this.paginator;
      this.loadMap();
    }
  }

  animateMap(element) {
    console.log(element);
      setTimeout( ( ) => {
        this.map.animateTo({
          center: [element.latitude, element.longitude],
          zoom: 12,
          pitch: 20,
          bearing: 0
        }, {
          duration: 1000
        });
      }, 1000);
    }

  applyMarkers(org) {

    org.forEach(element => {
      this.marker = new maptalks.Marker(
        [element.latitude, element.longitude],
        {
          'properties' : {
            'name' : element.name
          },
          symbol : [
            {
              'markerFile'   : '../../assets/icons/office/resources.png',
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
        'content'   : element.info
      });
      this.marker.openInfoWindow();
    });
  }
// map initializations
  mapInitialization(lat, lon ) {
    this.map = new maptalks.Map('map', {
      center: [lat, lon],
      zoom: 14,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b' , 'c' , 'd'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    });
  }

  loadMap() {
    const size = this.resources.length - 1;
    if (0 <= size) {
      this.mapInitialization(this.resources[size].latitude, this.resources[size].longitude);
      this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
      this.applyMarkers(this.resources);
    } else {
      window.navigator.geolocation.getCurrentPosition((location) => {
        this.mapInitialization(location.coords.longitude, location.coords.latitude);
        });
    }
  }

  updateRecord(element) {
    console.log(element);
    const dialogRef = this.matDialog.open(OverlayUpdateOrgComponent, {
      width: '250px',
      data: {actualData: element, updateData: this.updateData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(this.updateData);
      if (result) {
        if (environment.isDataAvailableInRealService) {
          this.updateResource(element);
        } else {
          element.name = this.updateData.name;
          element.type = this.updateData.type;
          element.info = this.updateData.info;
          this.snackBar.openFromComponent(PopupComponent, {
            duration: 1000,
            data: 'Updated Data...!'
          });
          this.map.removeLayer(this.layer);
          this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
          this.applyMarkers(this.resources);
          this.animateMap(element);
        }
      }
    });
  }

  deleteRecord(element) {
    console.log(element);
    this.resourceIndex = this.resources.indexOf(element);
    this.openDialog(element);
  }

  openDialog(element): void {
    const dialogRef = this.matDialog.open(OverlayDeleteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        if (this.resourceIndex !== -1) {
          if (environment.isDataAvailableInRealService) {
            this.resourceService.deleteResource(element.id).subscribe((res) => {
              console.log(res);
              if ( res.deleted === 1 ) {
                this.resources.splice(this.resourceIndex, 1);
                this.dataSource = new MatTableDataSource<any>(this.resources);
                this.map.removeLayer(this.layer);
                this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
                this.applyMarkers(this.resources);
                this.snackBar.openFromComponent(PopupComponent, {
                  duration: 1000,
                  data: 'Record Deleted...!'
                });
              }
            },
            error => {
              this.snackBar.openFromComponent(PopupComponent, {
                duration: 2000,
                data: 'Service Error...!'
              });
            });

          } else {
            this.resources.splice(this.resourceIndex, 1);
            this.service.saveResource(this.resources);
            this.dataSource = new MatTableDataSource<any>(this.resources);
            this.map.removeLayer(this.layer);
            this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
            this.applyMarkers(this.resources);
          }
        }
      }
    });
  }

  getAllResources() {

    this.store.select("resources").subscribe((res) => {
      this.resources = res.data;
      console.log(this.resources);
      this.dataSource = new MatTableDataSource<any>(this.resources);
      this.dataSource.paginator = this.paginator;
      this.loadMap();
    },
    error => {
      this.snackBar.openFromComponent(PopupComponent, {
        duration: 3000,
        data: 'Service Error...!'
      });
    });
  }

  updateResource(element) {
    console.log('req', this.updateData);
    this.resourceService.updateResource(this.updateData).subscribe((res) => {
      console.log(res);
      if ( res.id === this.updateData.id ) {
          element.name = this.updateData.name;
          element.type = this.updateData.type;
          element.info = this.updateData.info;
          this.snackBar.openFromComponent(PopupComponent, {
            duration: 1000,
            data: 'Record Updated...!'
          });
          this.map.removeLayer(this.layer);
          this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
          this.applyMarkers(this.resources);
      }
    },
    error => {
      this.snackBar.openFromComponent(PopupComponent, {
        duration: 2000,
        data: 'Service Error...!'
      });
    });
  }

  filterResourceInfo(value) {
          this.dataSource.filter = value.trim().toLowerCase();
          this.map.removeLayer(this.layer);
          this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
          this.applyMarkers(this.dataSource.filteredData);
          if (this.dataSource.filteredData.length === 0) {
            this.filterSize = true;
          } else {
            this.filterSize = false;
          }
  }
}