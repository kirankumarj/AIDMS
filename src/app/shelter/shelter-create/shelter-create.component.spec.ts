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
    latitude: 78.498,
    longitude: 17.476,
    type: '',
    status: '',
    maxCapacity: '',
    currentOccupancy: '',
    contact: '',
    city: '',
    country: '',
    postcode: '',
    state: '',
    state_district: '',
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

  it('Shelter Create :: get AllShelters test case', () => {
    component.loadMap();
    this.newShleter = newShelterObject;
    component.getAllShelters();
  });

  it('Shelter Create :: service flag true test case (calls real API) ', () => {
    component.loadMap();
    this.newShleter = newShelterObject;
    environment.isDataAvailableInRealService = true;
    component.saveShelter();
    component.getAllShelters();
    component.createShelter();
    component.ngAfterViewInit();
    component.getStatus();
    component.nextStep();
    component.prevStep();
    component.searchMapLocationBySearchData();
    environment.isDataAvailableInRealService = false;
  });

});
