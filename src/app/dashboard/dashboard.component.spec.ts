import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, ModuleWithProviders} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { MaterialModule} from '../materialModules';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { AllReducers} from '../app.reducers';
import { CommonModule} from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { environment } from '../../environments/environment';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent}

];

@NgModule({
  declarations: [PopupComponent],
  entryComponents: [
    PopupComponent,
  ]
})
class TestModule1 {}

class TestModule {}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        StoreModule.forRoot(AllReducers),
        RouterModule.forRoot(routes),
        TestModule1
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
