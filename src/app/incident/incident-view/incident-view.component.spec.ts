import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { IncidentViewComponent } from './incident-view.component';
import {MaterialModule} from '../../materialModules';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'incident-view', component: IncidentViewComponent}

];

describe('IncidentViewComponent', () => {
  let component: IncidentViewComponent;
  let fixture: ComponentFixture<IncidentViewComponent>;

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
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Incident View : ngAfterViewInit method test case', () => {
    component.map.remove();
    component.ngAfterViewInit();

  });

  it('Incident View : filterOrgInfo method test case', () => {
    //component.loadMap();
    component.dataSource.filteredData = [];
    component.filterOrgInfo('sample-incident');
    expect(component.dataSource.filter).toBeDefined();
    expect(component.filterSize).toBe(true);
  })
});
