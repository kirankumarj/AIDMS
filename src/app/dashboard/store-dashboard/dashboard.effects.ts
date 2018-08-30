import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as DashboardActionTypes from './dashboard.actions';
import { switchMap, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {IncidentCountService} from '../../services/dashboard/incident.service';

@Injectable()
export class DashboardEffects {

  constructor(private actions$: Actions, private inc: IncidentCountService) {}

  @Effect()
  getOpenIncidentsCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.OPEN_INCIDENTS)
  .pipe(switchMap(()=>this.inc.getOpenIncidentCount()),
      map(res =>new DashboardActionTypes.getOpenIncidentsCountSuccess(res))
  )

  @Effect()
  getInprogressIncidentsCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.INPROGRESS_INCIDENTS)
  .pipe(switchMap(()=>this.inc.getInProgressIncidentCount()),
      map(res =>new DashboardActionTypes.getOpenIncidentsCountSuccess(res))
  )

  @Effect()
  getTotalResourcesCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.TOTAL_RESOURCES)
  .pipe(switchMap(()=>this.inc.getTotalResourcesCount()),
      map(res =>new DashboardActionTypes.getTotalResourceSuccess(res))
  )

  @Effect()
  getAvailableResourcesCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.AVAILABLE_RESOURCES)
  .pipe(switchMap(()=>this.inc.getAvailableResourceCount()),
      map(res =>new DashboardActionTypes.getAvailableResourceSuccess(res))
  )

  @Effect()
  getAllocatedResourcesCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.ALLOCATED_RESOURCES)
  .pipe(switchMap(()=>this.inc.getAllocatedResourceCount()),
      map(res =>new DashboardActionTypes.getallocatedResourceSuccess(res))
  )

  @Effect()
  getTotalAssetsCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.TOTAL_ASSETS)
  .pipe(switchMap(()=>this.inc.getTotalAssetsCount()),
      map(res =>new DashboardActionTypes.gettotalAssetsSuccess(res))
  )

  @Effect()
  getAvaiableAssetsCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.AVAILABLE_ASSETS)
  .pipe(switchMap(()=>this.inc.getAvailableAssetsCount()),
      map(res =>new DashboardActionTypes.getavailableAssetsSuccess(res))
  )

  @Effect()
  getDefectiveAssetsCount$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.DEFECTIVE_ASSETS)
  .pipe(switchMap(()=>this.inc.getDefectiveAssetsCount()),
      map(res =>new DashboardActionTypes.getdefectiveAssetsSuccess(res))
  )

  @Effect()
  getLiveNewsFeed$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.LIVE_NEWS_FEED)
  .pipe(switchMap(()=>this.inc.getLiveNewsFeed()),
      map(res =>new DashboardActionTypes.getliveNewsFeedSuccess(res))
  )

  @Effect()
  getNotifications$:Observable<Action>=this.actions$
  .ofType(DashboardActionTypes.NOTIFICATIONS)
  .pipe(switchMap(()=>this.inc.getNotification()),
      map(res =>new DashboardActionTypes.getNotificationsSuccess(res))
  )
  

}
