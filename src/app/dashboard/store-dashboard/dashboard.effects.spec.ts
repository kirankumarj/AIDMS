import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { DashboardEffects } from './dashboard.effects';

describe('DashboardEffects', () => {
  let actions$: Observable<any>;
  let effects: DashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        DashboardEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(DashboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
