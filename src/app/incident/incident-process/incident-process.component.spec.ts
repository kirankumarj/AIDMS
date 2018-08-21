import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentProcessComponent } from './incident-process.component';

describe('IncidentProcessComponent', () => {
  let component: IncidentProcessComponent;
  let fixture: ComponentFixture<IncidentProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
