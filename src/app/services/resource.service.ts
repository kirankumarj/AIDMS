import { Injectable } from '@angular/core';
import {RestService} from './rest.service';
import {AppConstants} from '../app.constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private restService: RestService) { }


  public getAllResources(): Observable<any> {
    console.log('From the getAllResources....');
    return this.restService.findAll(AppConstants.RESOURCES_URL);
  }


  public createResource(createRequest: any): Observable<any> {
    console.log('From the createResource.....'+createRequest.name);
    return this.restService.post(createRequest, AppConstants.RESOURCES_URL);
  }

  public deleteResource(resourceId): Observable<any> {
    return this.restService.delete(AppConstants.DELETE_RESOURCE(resourceId));
  }

  public updateResource(req: any): Observable<any> {
    console.log(req);
    return this.restService.update(req, AppConstants.RESOURCES_URL);
  }
}
