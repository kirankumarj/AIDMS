import {AppState} from './app.state';
import {ActionReducer,ActionReducerMap} from '@ngrx/store';
import * as orgReducers from './org/store/org.reducers';
import * as assetsReduceras from './new-assets/store/assets.reducer';
import * as dashboardReducers from './dashboard/store-dashboard/dashboard.reducer';
import * as shelterReducers from  './shelter/store/shelter.reducers';
import * as resourceReducer from './resource/store/resource.reducers';
import {
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';

export const AllReducers:ActionReducerMap<AppState>={
            organizations:orgReducers.orgReducer,
            assets:assetsReduceras.reducer,
            openIncidents:dashboardReducers.openIncidentReducer,
            inProgressIncidents:dashboardReducers.inProgressIncidentReducer,
            totalResources:dashboardReducers.totalResourcesReducer,
            availableResources:dashboardReducers.availableResourcesReducer,
            defectiveResources:dashboardReducers.defectiveResourcesReducer,
            totalAssets:dashboardReducers.totalAssetsReducer,
            availableAssets:dashboardReducers.availableAssetsReducer,
            defectiveAssets:dashboardReducers.defectiveAssetsReducer,
            liveNewsFeed:dashboardReducers.liveNewsFeedReducer,
            notifications:dashboardReducers.notificationReducer,
            shelters:shelterReducers.shelterReducer,
            resources:resourceReducer.resourceReducer

}

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}