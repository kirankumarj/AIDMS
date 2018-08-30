import * as fromOrganization from './org/store/org.reducers';
import * as fromAssets from './new-assets/store/assets.reducer';
import * as fromdashboard from './dashboard/store-dashboard/dashboard.reducer';
import * as fromShelter from './shelter/store/shelter.reducers'
import { ShelterMapInfo } from "src/app/models/shelter/ShelterMapInfo";
import * as fromResource from './resource/store/resource.reducers';


export interface AppState{
    organizations:fromOrganization.State;
    assets:fromAssets.State
    openIncidents:OpenIncidentsState;
    inProgressIncidents:InProgressIncidentsState;
    totalResources:TotalResourcesState;
    availableResources:AvailableResourcesState;
    allocatedResources:AllocatedResourcesState;
    totalAssets:TotalAssetsState;
    availableAssets:AvailableAssetsState;
    defectiveAssets:DefectiveAssetsState;
    liveNewsFeed:LiveNewsState;
    notifications:NotificationState;
    shelters:ShelterState;
    resources: fromResource.State;
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

export interface AllocatedResourcesState {
    allocatedResources:any;
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


   