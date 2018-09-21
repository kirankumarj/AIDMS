import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, ModuleWithProviders} from '@angular/core';

import { ResourceCreateComponent } from './resource-create.component';
import { MaterialModule} from '../../materialModules';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { AllReducers} from '../../app.reducers';
import { CommonModule} from '@angular/common';
import { PopupComponent } from '../../popup/popup.component';
import { environment } from '../../../environments/environment';
import { OrganizationService } from '../../services/organization.service';

@NgModule({
  declarations: [PopupComponent],
  entryComponents: [
    PopupComponent,
  ]
})
class TestModule1 {}

class TestModule {}
describe('ResourceCreateComponent', () => {
  let component: ResourceCreateComponent;
  let fixture: ComponentFixture<ResourceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCreateComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        StoreModule.forRoot(AllReducers),
        TestModule1
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  const newResourceObject = {
    org: '',
    dept: '',
    job: '',
    skill:'',
    phone:'',
    email: '',
    name: '',
    latitude: 78.498,
    longitude: 17.476,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Resource Create :: service flag true test case (calls real API) ', () => {
    
    this.newResource = newResourceObject;
    environment.isDataAvailableInRealService = true;
    component.saveResource();
    component.ngAfterViewInit();
    component.loadMap();
    component.getStatus();
    component.nextStep();
    component.prevStep();
    component.searchMapLocationBySearchData();
    environment.isDataAvailableInRealService = false;
  });

});
