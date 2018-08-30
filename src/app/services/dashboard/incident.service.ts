import { Injectable } from '@angular/core';
import {RestService} from '../rest.service';
import {Observable} from 'rxjs';
import {AppConstants} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class IncidentCountService {

  constructor(private restService: RestService) { }

  public getOpenIncidentCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_OPEN_INCIDENT_COUNT);
  }

  public getInProgressIncidentCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_INPROGESS_INCIDENT_COUNT);
  }

  public getTotalResourcesCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_TOTAL_RESOURCES_COUNT);
  }

  public getAvailableResourceCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_AVAILABLE_RESOURCES_COUNT);
  }

  public getAllocatedResourceCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_ALLOCATED_RESOURCES_COUNT);
  }

  public getTotalAssetsCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_TOTAL_ASSETS);
  }

  public getAvailableAssetsCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_AVAILABLE_ASSETS);
  }

  public getDefectiveAssetsCount(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_DEFECTIVE_ASSETS);
  }

  public getLiveNewsFeed(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_LIVE_NEWS_FEED);
  }

  public getNotification(): Observable<any> {
    return this.restService.findAll(AppConstants.GET_NOTIFICATIONS);
  }

}
