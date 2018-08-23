import { Injectable } from '@angular/core';
import {RestService} from './rest.service';
import {AppConstants} from '../app.constants';
import { ShelterMapInfo } from '../models/shelter/ShelterMapInfo';
import {Observable} from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  constructor(private restService: RestService,private http: HttpClient) { }

  public getAllShelters(): Observable<any> {
    console.log('From the getAllShelters....');
    return this.restService.findAll('http://localhost:3000/api/shelters');
  }

  public getShelter(id): Observable<any> {
    return this.restService.findOne(id, AppConstants.SHELTER_URL);
  }

  public shelterById(id): Observable<any> {
    return this.restService.findOne(id, AppConstants.SHELTER_URL);
  }

  public createShelter(shelter: ShelterMapInfo): Observable<ShelterMapInfo> {
    console.log('From the createShelter.....');
    return this.http.post<ShelterMapInfo>('http://localhost:3000/api/shelters', shelter);
  }

  public updateShelter(req: any): Observable<any> {
    console.log(req);
    return this.restService.update(req, AppConstants.SHELTER_URL);
  }

  public deleteShelter(shelterId): Observable<any> {
    return this.restService.delete(AppConstants.DELETE_SHELTER(shelterId));
  }    


}