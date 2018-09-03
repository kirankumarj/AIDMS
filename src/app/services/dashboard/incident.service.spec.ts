import { TestBed, inject } from '@angular/core/testing';

import { IncidentCountService } from './incident.service';

describe('IncidentCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentCountService]
    });
  });

  it('should be created', inject([IncidentCountService], (service: IncidentCountService) => {
    expect(service).toBeTruthy();
  }));
});
