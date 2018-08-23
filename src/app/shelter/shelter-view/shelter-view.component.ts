import { Component, OnInit, AfterViewChecked, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { InfoService } from '../../info.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { ShelterMapInfo } from '../../models/shelter/ShelterMapInfo';
import * as maptalks from 'maptalks';
import { OverlayDeleteComponent } from '../../popup/overlay-delete/overlay-delete.component';
import { OverlayUpdateOrgComponent } from '../../popup/overlay-update-org/overlay-update-org.component';
import { PopupComponent } from '../../popup/popup.component';

import { environment } from '../../../environments/environment';
import { ShelterService } from '../../services/shelter.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState, ShelterState } from '../../app.state';
import { getAllShelters } from '../store/shelter.reducers';
import * as shelterActions from '../store/shelter.actions';
import * as fromReducer from '../store/shelter.reducers';
import * as fromActions from '../store/shelter.actions';
import { map, take } from 'rxjs/operators';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-shelter-view',
  templateUrl: './shelter-view.component.html',
  styleUrls: ['./shelter-view.component.css']
})
export class ShelterViewComponent implements OnInit, AfterViewInit {
  sheltersList: Observable<ShelterMapInfo[]>;
  displayedColumns: string[] = ['name', 'type', 'status', 'maxcapacity', 'currentoccupancy', 'action'];
  dataSource;
  shelter = [];
  mapSelcted = '';
  incidentLocations = [];
  shelters;
  layer;
  map;
  marker;
  orgIndex;
  action;
  filterSize = false;
  updateData = {
    id: '',
    name: '',
    latitude: 0,
    longitude: 0,
    type: '',
    status: '',
    maxCapacity: '',
    currentOccupancy: '',
    contact: '',
    address: {
      city: '',
      country: '',
      postcode: '',
      state: '',
      state_district: ''
    }
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  shelters$: Observable<ShelterMapInfo[]>;
  message$: Observable<any>;
  private shelterSubscription: Subscription;

  constructor(private service: InfoService, private matDialog: MatDialog, private snackBar: MatSnackBar,
    private shelterService: ShelterService,
    private store: Store<ShelterState>) {
    this.store.dispatch(new fromActions.GetAllShelter());
  
  }

  ngOnInit() {
    }

  ngAfterViewInit() {
   this.shelters$ = this.store.select('shelters');
    this.shelters$.pipe(take(2)).subscribe((data) => {
      console.log(data["shelters"]);
      this.shelters =data["shelters"];
      this.dataSource = new MatTableDataSource<ShelterMapInfo>(this.shelters);
      this.dataSource.paginator = this.paginator;
      this.loadMap();
    });

    


  }

  animateMap(element) {
    console.log(element);
    setTimeout(() => {
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
          'properties': {
            'name': element.name
          },
          symbol: [
            {
              'markerFile': '../../assets/icons/office/office.png',
              'markerWidth': 30,
              'markerHeight': 40
            },
            {
              'textFaceName': 'sans-serif',
              'textName': '{name}',
              'textSize': 14,
              'textDy': 24
            }
          ]
        }
      ).addTo(this.layer);
      this.marker.setInfoWindow({
        'title': element.name,
        'content': element.info
      });
      this.marker.openInfoWindow();
    });
  }

  mapInitialization() {
    this.map = new maptalks.Map('map', {
      center: [-0.113049, 51.498568],
      zoom: 14,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    });
  }

  loadMap() {
    const size = this.shelter.length - 1;
    this.mapInitialization();
    const ref = this;

    this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
    this.applyMarkers(this.shelters);

    new maptalks.control.Toolbar({
      'vertical': true,
      'position': 'top-right',
      'items': [{
        item: 'Shelter Zone',
        click: function () { },
        children: [{
          item: 'East',
          click: function () {
            ref.mapSelcted = 'east';
            ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
            ref.map.removeLayer(ref.layer);
            ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
            ref.applyMarkers(ref.dataSource.filteredData);
          }
        }, {
          item: 'West',
          click: function () {
            ref.mapSelcted = 'west';
            ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
            ref.map.removeLayer(ref.layer);
            ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
            ref.applyMarkers(ref.dataSource.filteredData);
          }
        }, {
          item: 'North',
          click: function () {
            ref.mapSelcted = 'north';
            ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
            ref.map.removeLayer(ref.layer);
            ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
            ref.applyMarkers(ref.dataSource.filteredData);
          }
        }, {
          item: 'South',
          click: function () {
            ref.mapSelcted = 'south';
            ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
            ref.map.removeLayer(ref.layer);
            ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
            ref.applyMarkers(ref.dataSource.filteredData);
          }
        }, {
          item: 'all',
          click: function () {
            ref.mapSelcted = '';
            ref.dataSource.filter = ref.mapSelcted.trim().toLowerCase();
            ref.map.removeLayer(ref.layer);
            ref.layer = new maptalks.VectorLayer('vector').addTo(ref.map);
            ref.applyMarkers(ref.shelters);
          }
        }]
      }, {
        item: '---',
        click: function () { ref.mapSelcted = 'all'; }
      }]
    })
      .addTo(this.map);
  }

  updateRecord(element) {
    console.log(element);
    const dialogRef = this.matDialog.open(OverlayUpdateOrgComponent, {
      width: '250px',
      data: { actualData: element, updateData: this.updateData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(this.updateData);
      if (result) {
        if (environment.isDataAvailableInRealService) {
          this.updateShelter(element);
        } else {
          element.name = this.updateData.name;
          element.type = this.updateData.type;
          element.status = this.updateData.status;
          element.maxCapacity = this.updateData.maxCapacity;
          element.currentOccupancy = this.updateData.currentOccupancy;
          element.contact = this.updateData.contact;
          this.snackBar.openFromComponent(PopupComponent, {
            duration: 1000,
            data: 'Updated Data...!'
          });
          this.map.removeLayer(this.layer);
          this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
          this.applyMarkers(this.shelter);
          this.animateMap(element);
        }
      }
    });
  }

  deleteRecord(element) {
    console.log(element);
    this.orgIndex = this.shelter.indexOf(element);
    this.openDialog(element);
  }

  openDialog(element): void {
    const dialogRef = this.matDialog.open(OverlayDeleteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        if (this.orgIndex !== -1) {
          if (environment.isDataAvailableInRealService) {
            this.shelterService.deleteShelter(element.id).subscribe((res) => {
              console.log(res);
              if (res.deleted === 1) {
                this.shelter.splice(this.orgIndex, 1);
                this.dataSource = new MatTableDataSource<ShelterMapInfo>(this.shelter);
                this.map.removeLayer(this.layer);
                this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
                this.applyMarkers(this.shelter);
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
            this.shelter.splice(this.orgIndex, 1);
            this.service.saveShelter(this.shelter);
            this.dataSource = new MatTableDataSource<ShelterMapInfo>(this.shelter);
            this.map.removeLayer(this.layer);
            this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
            this.applyMarkers(this.shelter);
          }
        }
      }
    });
  }

  getAllShelters() {

    this.shelterService.getAllShelters().subscribe((res) => {
      this.shelter = res;
      console.log(this.shelter);
      this.dataSource = new MatTableDataSource<ShelterMapInfo>(this.shelter);
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

  updateShelter(element) {
    console.log('req', this.updateData);
    this.shelterService.updateShelter(this.updateData).subscribe((res) => {
      console.log(res);
      if (res.id === this.updateData.id) {
        element.name = this.updateData.name;
        element.type = this.updateData.type;
        element.status = this.updateData.status;
        element.maxCapacity = this.updateData.maxCapacity;
        element.currentOccupancy = this.updateData.currentOccupancy;
        element.contact = this.updateData.contact;
        this.snackBar.openFromComponent(PopupComponent, {
          duration: 1000,
          data: 'Record Updated...!'
        });
        this.map.removeLayer(this.layer);
        this.layer = new maptalks.VectorLayer('vector').addTo(this.map);
        this.applyMarkers(this.shelter);
      }
    },
      error => {
        this.snackBar.openFromComponent(PopupComponent, {
          duration: 2000,
          data: 'Service Error...!'
        });
      });
  }

  filterStatusInfo(value) {
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
