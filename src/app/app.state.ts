import * as fromOrganization from './org/store/org.reducers';
import * as fromAssets from './new-assets/store/assets.reducer';
import * as fromdashboard from './dashboard/store-dashboard/dashboard.reducer';
import * as fromShelter from './shelter/store/shelter.reducers'
import { ShelterMapInfo } from "src/app/models/shelter/ShelterMapInfo";


export interface AppState{
    organizations:fromOrganization.State;
    assets:fromAssets.State
    openIncidents:OpenIncidentsState;
    inProgressIncidents:InProgressIncidentsState;
    totalResources:TotalResourcesState;
    availableResources:AvailableResourcesState;
    defectiveResources:DefectiveResourcesState;
    totalAssets:TotalAssetsState;
    availableAssets:AvailableAssetsState;
    defectiveAssets:DefectiveAssetsState;
    liveNewsFeed:LiveNewsState;
    notifications:NotificationState;
    shelters:ShelterState;
}

export interface ShelterState {
	shelters: ShelterMapInfo[];
	message: any;
}

export interface NotificationState {
    notifications: any;
    message: any;
}

export interface LiveNewsState {
    liveNewsFeed: any;
    message: any;
}

export interface OpenIncidentsState {
    openIncidents:any;
    message: any;
}

export interface InProgressIncidentsState {
    inProgressIncidents:any;
    message: any;
}

export interface TotalResourcesState {
    totalResources:any;
    message: any;
}

export interface AvailableResourcesState {
    availableResources:any;
    message:any;
}

export interface DefectiveResourcesState {
    defectiveResources:any;
    message:any;
}

export interface TotalAssetsState{
    totalAssets:any;
    message:any;
}

export interface AvailableAssetsState{
    availableAssets:any;
    message:any;
}

export interface DefectiveAssetsState{
    defectiveAssets:any;
    message:any;
}


   