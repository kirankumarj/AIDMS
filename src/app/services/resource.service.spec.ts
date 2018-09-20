import { TestBed, inject } from '@angular/core/testing';

import { ResourceService } from './resource.service';
import { HttpClientModule } from '@angular/common/http';
import {RestService} from './rest.service';

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [ResourceService, RestService]
    });
  });

  it('should be created', inject([ResourceService, RestService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});
