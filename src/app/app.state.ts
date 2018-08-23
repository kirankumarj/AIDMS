import * as fromOrganization from './org/store/org.reducers';
import * as fromAssets from './new-assets/store/assets.reducer';
import * as fromdashboard from './dashboard/store-dashboard/dashboard.reducer';
import * as fromShelter from './shelter/store/shelter.reducers'
import { ShelterMapInfo } from "src/app/models/shelter/ShelterMapInfo";


export interface AppState{
    organizations:fromOrganization.State;
    assets:fromAssets.State
    openIncidents:fromdashboard.State;
    inProgressIncidents:fromdashboard.State;
    totalResources:fromdashboard.State;
    availableResources:fromdashboard.State;
    defectiveResources:fromdashboard.State;
    totalAssets:fromdashboard.State;
    availableAssets:fromdashboard.State;
    defectiveAssets:fromdashboard.State;
    liveNewsFeed:fromdashboard.State;
    notifications:fromdashboard.State;
    shelters:ShelterState;
}

export interface ShelterState {
	shelters: ShelterMapInfo[];
	message: any;
}