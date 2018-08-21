import * as fromOrganization from './org/store/org.reducers';
import * as fromAssets from './new-assets/store/assets.reducer';


export interface AppState{
    organizations:fromOrganization.State;
    assets:fromAssets.State
}