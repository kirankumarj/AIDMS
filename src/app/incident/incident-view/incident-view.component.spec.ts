import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { IncidentViewComponent } from './incident-view.component';
import {MaterialModule} from '../../materialModules';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { mockData } from '../../../mock/mockservicedata';
import { InfoService } from '../../info.service';
import { OrgMapInfo } from '../../models/organization/OrgMapInfo';
import { MatTableDataSource } from '@angular/material';

const routes: Routes = [
  { path: 'incident-view', component: IncidentViewComponent}

];

describe('IncidentViewComponent', () => {
  let originalTimeout = 5000;
  let component: IncidentViewComponent;
  let fixture: ComponentFixture<IncidentViewComponent>;
  let service: InfoService;

  const mockIncidentsList = [
    {
      'id' : '0001',
      'name': 'Incident1',
      'latitude': -0.12066,
      'longitude': 51.498568,
      'info': 'InfoIncident1',
      'type': 'fire',
      'priority': 'low',
      'status': 'In-Progress'
    },
    {
      'id' : '0002',
      'name': 'Incident2',
      'latitude': -0.14161,
      'longitude': 51.49509,
      'info': 'Floods',
      'type': 'floods',
      'priority': 'High',
      'status': 'open'
    }
  ];

  const newIncidentObj = {
    id: '',
    name: '',
    type: '',
    info: '',
    lat: 78.498,
    lon: 17.476,
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentViewComponent ],
      imports:[
        MaterialModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        InfoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    fixture = TestBed.createComponent(IncidentViewComponent);
    component = fixture.componentInstance;
  });

  // it('should create', fakeAsync(() => {
  //   let fixture1 = TestBed.createComponent(IncidentViewComponent);
  //   let component1 = fixture1.componentInstance;
  //   service = fixture1.debugElement.injector.get(InfoService);
  //   let spy = spyOn(service, 'incident').and.returnValue(Promise.resolve(this.mockIncidentsList))
  //   fixture.detectChanges();
  //   tick();
  //   expect(component).toBeTruthy();
  // }));

  it('Incident View : ngAfterViewInit method test case', () => {
    console.log('ngAfterViewInit Test Case :: value for mockIncidentsList ::', JSON.stringify(this.mockIncidentsList));
    component.incidents = mockIncidentsList;
    component.ngAfterViewInit();
  });

  it('Incident View : filterOrgInfo method test case', () => {
    //component.loadMap();
    component.dataSource = new MatTableDataSource<OrgMapInfo>(mockIncidentsList);
    component.dataSource.filteredData = [];
    component.mapInitialization();
    component.filterOrgInfo('sample-incident');
    expect(component.dataSource.filter).toBeDefined();
    expect(component.filterSize).toBe(true);
  })

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});
