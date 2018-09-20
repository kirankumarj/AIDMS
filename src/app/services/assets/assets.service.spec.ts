import { TestBed, inject } from '@angular/core/testing';

import { AssetsService } from './assets.service';
import { HttpClientModule } from '@angular/common/http';
import {RestService} from '../rest.service';

describe('AssetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [AssetsService, RestService]
    });
  });

  it('should be created', inject([AssetsService, RestService], (service: AssetsService) => {
    expect(service).toBeTruthy();
  }));
});
