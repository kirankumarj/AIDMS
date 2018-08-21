import {AppState} from './app.state';
import {ActionReducer,ActionReducerMap} from '@ngrx/store';
import * as orgReducers from './org/store/org.reducers';
import * as assetsReduceras from './new-assets/store/assets.reducer';
import * as dashboardReducers from './dashboard/store-dashboard/dashboard.reducer';
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
            defectiveAssets:dashboardReducers.reducer
}