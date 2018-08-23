import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as resourceActions from './resource.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';

import {GetAllResources} from './resource.actions';
import {OrganizationService} from '../../services/organization.service';
import { switchMap, map } from 'rxjs/operators';
import { OrgMapInfo } from '../../models/organization/OrgMapInfo';
import { ResourceService } from '../../services/resource.service'


@Injectable()
export class ResourceEffects{
    constructor(
        private actions$: Actions,
        private svc: OrganizationService,
        private resourceService: ResourceService,
    ){}
    @Effect()
    getAllOrganizations$:Observable<Action>=this.actions$
    .ofType(resourceActions.GET_ALL_RESOURCES)
    .pipe(
        switchMap((()=>this.resourceService.getAllResources())),
        map(res =>new resourceActions.GetAllResourcesSuccess(res))
    )

    @Effect()
    createOrganization$ = this.actions$
      .ofType(resourceActions.CREATE_RESOURCES)
      .pipe(
        map((action: resourceActions.AddResource) => action.payload),
        switchMap(newResource => this.resourceService.createResource(newResource)),
        map((response) => new resourceActions.AddResourceSuccess(response.id))
        
      )

        @Effect()
        removeOrganization$ = this.actions$
         .ofType(resourceActions.DELETE_RESOURCES)
         .pipe(
            map((action: resourceActions.RemoveResource) => action.payload),
            switchMap(id => this.svc.deleteOrganization(id)),
            map((organization: OrgMapInfo) => new resourceActions.RemoveResourceSuccess(organization))
         )
}

