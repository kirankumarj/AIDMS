import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceViewComponent } from './resource-view.component';
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

describe('ResourceViewComponent', () => {
  let component: ResourceViewComponent;
  let fixture: ComponentFixture<ResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceViewComponent ],
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

  const newResourceUpdateObj = {
    id: '',
    org: '',
    dept: '',
    job: '',
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
    fixture = TestBed.createComponent(ResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
