import {AppState} from './app.state';
import {ActionReducer,ActionReducerMap} from '@ngrx/store';
import * as orgReducers from './org/store/org.reducers';
import * as assetsReduceras from './new-assets/store/assets.reducer';
import * as dashboardReducers from './dashboard/store-dashboard/dashboard.reducer';
import * as shelterReducers from  './shelter/store/shelter.reducers';
import {
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';

export const AllReducers:ActionReducerMap<AppState>={
            organizations:orgReducers.orgReducer,
            assets:assetsReduceras.reducer,
            openIncidents:dashboardReducers.reducer,
            inProgressIncidents:dashboardReducers.reducer,
            totalResources:dashboardReducers.reducer,
            availableResources:dashboardReducers.reducer,
            defectiveResources:dashboardReducers.reducer,
            totalAssets:dashboardReducers.reducer,
            availableAssets:dashboardReducers.reducer,
            defectiveAssets:dashboardReducers.reducer,
            liveNewsFeed:dashboardReducers.reducer,
            notifications:dashboardReducers.reducer,
            shelters:shelterReducers.shelterReducer

}

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}