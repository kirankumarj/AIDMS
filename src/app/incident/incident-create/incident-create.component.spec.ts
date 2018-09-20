import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgModule, ModuleWithProviders} from '@angular/core';

import { IncidentCreateComponent } from './incident-create.component';
import { PopupComponent } from "src/app/popup/popup.component";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from '../../materialModules';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [PopupComponent],
  entryComponents: [
    PopupComponent,
  ]
})
class TestModule1 {}

class TestModule {}
describe('IncidentCreateComponent', () => {
  let component: IncidentCreateComponent;
  let fixture: ComponentFixture<IncidentCreateComponent>;

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
      declarations: [ IncidentCreateComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TestModule1
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCreateComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' Incident Create moveMap method test case', () => {
    component.loadMap();
    this.newIncident = newIncidentObj;
    console.log("Passing newIncidentObj : ", newIncidentObj);
    component.moveMap(newIncidentObj);
    expect(fixture.debugElement.componentInstance.step).toBe(1);
  });

  it(' Incident Create changeIncidentType method test case', () => {
    component.loadMap();
    component.changeIncidentType('true');
    expect(fixture.debugElement.componentInstance.newIncident.type).toBe('true');
  });

  it('Org Create :: Save Org method test case', () => {
    component.loadMap();
    this.newIncident = newIncidentObj;
    const lengthList = fixture.debugElement.componentInstance.incidents.length;
    component.saveIncident();
    expect(fixture.debugElement.componentInstance.incidents.length).toBe(lengthList+1);
  });

  it('Incident Create :: service flag true test case (calls real API) ', () => {
    component.loadMap();
    this.newIncident = newIncidentObj;
    environment.isDataAvailableInRealService = true;
    component.ngOnInit();
    component.saveIncident();
    component.ngAfterViewInit();
    component.getStatus();
    component.nextStep();
    component.prevStep();
    component.searchMapLocationBySearchData();
    environment.isDataAvailableInRealService = false;
  });

});
