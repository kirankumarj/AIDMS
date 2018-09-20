import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterViewComponent } from './shelter-view.component';
import { MaterialModule} from '../../materialModules';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { AllReducers} from '../../app.reducers';
import { CommonModule} from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { OverlayUpdateOrgComponent } from '../../popup/overlay-update-org/overlay-update-org.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { ShelterService } from '../../services/shelter.service';
import { InfoService } from '../../info.service';

@NgModule({
  declarations: [PopupComponent],
  entryComponents: [
    PopupComponent,
  ],
  imports: [
  ]
})
class TestModulePopupComponent {}

@NgModule({
  declarations: [OverlayUpdateOrgComponent],
  entryComponents: [
    OverlayUpdateOrgComponent,
  ],
  imports: [
    FormsModule,
    MatDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
class TestModuleOverLay {}

describe('ShelterViewComponent', () => {
  let component: ShelterViewComponent;
  let fixture: ComponentFixture<ShelterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterViewComponent ],
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientModule,
        CommonModule,
        StoreModule.forRoot(AllReducers),
        TestModulePopupComponent,
        TestModuleOverLay,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
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
    fixture = TestBed.createComponent(ShelterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
