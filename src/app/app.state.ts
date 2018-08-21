import * as fromOrganization from './org/store/org.reducers';
import * as fromAssets from './new-assets/store/assets.reducer';
import * as fromdashboard from './dashboard/store-dashboard/dashboard.reducer';


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
}