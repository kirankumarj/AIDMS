import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { OrgMapInfo } from './models/organization/OrgMapInfo';

import { HttpClient } from '@angular/common/http';

import {environment} from '../environments/environment';

import { mockData } from '../mock/mockservicedata';
import { ShelterMapInfo } from './models/shelter/ShelterMapInfo';


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  findMapLocationBySearchDataURL = '';
  findMapLocationBySearchLLURL = '';
  org = mockData.orgList;
  officesList = mockData.officesList;
  listIncidents = mockData.incidentsList;
  shelterList = mockData.shelterList;
  resourceList = mockData.resourceList;
  dashboardMapAssetsList = mockData.DashboardMapAssets;

  private maps ;
  mapLocation;

  private incidents;
  incident;

  private offices;
  office;

  private shelters;
  shelter;

  private resources;
  resource;

  private dashboardMapAssets;
  dashboardMapAssert;

  constructor(private http: HttpClient) {

    if ( environment.isDataAvailableInRealService ) {

    } else {
      this.org = mockData.orgList;
      this.maps = new BehaviorSubject<any>(this.org);
      this.mapLocation = this.maps.asObservable();

      this.officesList = mockData.officesList;
      this.offices = new BehaviorSubject<any>(this.officesList);
      this.office = this.offices.asObservable();

      this.listIncidents = mockData.incidentsList;
      this.incidents = new BehaviorSubject<any>(this.listIncidents);
      this.incident = this.incidents.asObservable();

      this.shelterList = mockData.shelterList;
      this.shelters = new BehaviorSubject<any>(this.shelterList);
      this.shelter = this.shelters.asObservable();

      this.resourceList = mockData.resourceList;
      this.resources = new BehaviorSubject<any>(this.resourceList);
      this.resource = this.resources.asObservable();

      this.dashboardMapAssetsList = mockData.DashboardMapAssets;
      this.dashboardMapAssets = new BehaviorSubject<any>(this.dashboardMapAssetsList);
      this.dashboardMapAssert = this.dashboardMapAssets.asObservable();
    }

    this.findMapLocationBySearchDataURL = environment.findMapLocationBySearchDataURL;
    this.findMapLocationBySearchLLURL = environment.findMapLocationBySearchLLURL;
  }

  saveOrganization(orgMapInfo) {
    this.maps.next(orgMapInfo);
  }

  saveIncident(incidentInfo) {
    this.incidents.next(incidentInfo);
  }

  saveDashboardMapAssertsList(Info) {
    this.dashboardMapAssets.next(Info);
  }

  saveOffice(officeInfo) {
    this.offices.next(officeInfo);
  }

  saveResource(resourceInfo) {
    this.offices.next(resourceInfo);
  }
  getMapLocationData(address): Observable<any> {
    return this.http.get(this.findMapLocationBySearchDataURL + address);
  }

  getMapLocationDataByLL(latitude , longitude): Observable<any> {
    return this.http.get(this.findMapLocationBySearchLLURL + longitude + '&lon=' + latitude + '&addressdetails=1');
  }

  saveShelter(shelterMapInfo) {
    this.maps.next(shelterMapInfo);
  }

 



}
