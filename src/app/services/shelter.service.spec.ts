import { TestBed, inject } from '@angular/core/testing';

import { ShelterService } from './shelter.service';
import { HttpClientModule } from '@angular/common/http';
import {RestService} from './rest.service';


describe('ShelterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientModule
          ],
          providers: [ShelterService, RestService]
        });
    });

    it('should be created', inject([ShelterService, RestService], (service: ShelterService) => {
        expect(service).toBeTruthy();
    }));

});