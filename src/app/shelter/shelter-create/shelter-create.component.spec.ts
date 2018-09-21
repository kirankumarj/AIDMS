import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgModule, ModuleWithProviders} from '@angular/core';

import { ShelterCreateComponent } from './shelter-create.component';
import { PopupComponent } from "src/app/popup/popup.component";
import { MaterialModule} from '../../materialModules';
import { FormsModule} from '@angular/forms';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { AllReducers} from '../../app.reducers';
import { environment } from '../../../environments/environment';
import { ShelterService } from "src/app/services/shelter.service";
import { InfoService } from "src/app/info.service";

@NgModule({
  declarations: [PopupComponent],
  entryComponents: [
    PopupComponent,
  ]
})
class TestModule1 {}

class TestModule {}
describe('ShelterCreateComponent', () => {
  let component: ShelterCreateComponent;
  let fixture: ComponentFixture<ShelterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterCreateComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(AllReducers),
        TestModule1
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  const newShelterObject = {
    id: null,
    name: '',
    lat: 78.498,
    lon: 17.476,
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
      state_district: '',
      display_name: '',
      city_district: ''
    },
    zone: ''
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' Shelter Create :: moveMap method test case', () => {
    this.newShleter = newShelterObject;
    component.moveMap(newShelterObject);
    expect(fixture.debugElement.componentInstance.step).toBe(2);
  });

  it('Shelter Create :: get AllShelters test case', () => {
    component.loadMap();
    this.newShleter = newShelterObject;
    component.getAllShelters();
  });

  it('Shelter Create :: createShelter test case', () => {
    this.newShleter = newShelterObject;
    component.createShelter();
  });

  it('Shelter Create :: service flag true test case (calls real API) ', () => {
    component.loadMap();
    this.newShleter = newShelterObject;
    environment.isDataAvailableInRealService = true;
    component.saveShelter();
    component.ngAfterViewInit();
    component.getStatus();
    component.nextStep();
    component.prevStep();
    component.searchMapLocationBySearchData();
    environment.isDataAvailableInRealService = false;
  });

});
