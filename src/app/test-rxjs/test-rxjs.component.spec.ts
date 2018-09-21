import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { TestRxjsComponent } from './test-rxjs.component';

describe('TestRxjsComponent', () => {
  let component: TestRxjsComponent;
  let fixture: ComponentFixture<TestRxjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRxjsComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        CommonModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
