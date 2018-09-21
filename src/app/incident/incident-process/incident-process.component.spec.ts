import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentProcessComponent } from './incident-process.component';
import { MaterialModule} from '../../materialModules';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { AllReducers} from '../../app.reducers';
import { CommonModule} from '@angular/common';
import { environment } from '../../../environments/environment';
import { mockData } from '../../../mock/mockservicedata';
import { InfoService } from '../../info.service';
let service: InfoService;
let mockIncidentsList = mockData.incidentsList;

describe('IncidentProcessComponent', () => {
  let component: IncidentProcessComponent;
  let fixture: ComponentFixture<IncidentProcessComponent>;
  let service: InfoService;
  let mockIncidentsList = mockData.incidentsList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentProcessComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(AllReducers)
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   service = fixture.debugElement.injector.get(InfoService);
  //   let spy = spyOn(service, 'incident').and.returnValue(Promise.resolve(this.mockIncidentsList))
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component).toBeTruthy();
  //   });
  // });

});
