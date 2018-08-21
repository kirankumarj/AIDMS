import { Action } from '@ngrx/store';
import * as DashboardActionTypes from './dashboard.actions';

export interface State {
  openIncidents:any;
  inProgressIncidents:any;
  totalResources:any;
  availableResources:any;
  defectiveResources:any;
  totalAssets:any;
  availableAssets:any;
  defectiveAssets:any;
  message:string;
}

export const initialState: State = {
  openIncidents:0,
  inProgressIncidents:0,
  totalResources:0,
  availableResources:0,
  defectiveResources:0,
  totalAssets:0,
  availableAssets:0,
  defectiveAssets:0,
  message: ''
};

export function reducer(state = initialState, action: DashboardActionTypes.DashboardActions):any {
  switch (action.type) { 
      case DashboardActionTypes.OPEN_INCIDENTS_SUCCESS:
        return {
        openIncidents: action.openIncidentsCount,
        message: 'Success'
      };
      case DashboardActionTypes.INPROGRESS_INCIDENTS_SUCCESS:
        return {
        inProgressIncidents: action.inProgressIncidentsCount,
        message: 'Success'
      };
      case DashboardActionTypes.TOTAL_RESOURCES_SUCCESS:
        return {
        totalResources: action.totalResourceCount,
        message: 'Success'
      };
      case DashboardActionTypes.AVAILABLE_RESOURCES_SUCCESS:
        return {
        availableResources: action.availableResourceCount,
        message: 'Success'
      };
      case DashboardActionTypes.DEFECTIVE_RESOURCES_SUCCESS:
        return {
        defectiveResources: action.defectiveResourceCount,
        message: 'Success'
      };
      case DashboardActionTypes.TOTAL_ASSETS_SUCCESS:
        return {
        totalAssets: action.totalAssetsCount,
        message: 'Success'
      };
      case DashboardActionTypes.AVAILABLE_ASSETS_SUCCESS:
        return {
        availableAssets: action.availableAssetsCount,
        message: 'Success'
      };
      case DashboardActionTypes.DEFECTIVE_ASSETS_SUCCESS:
        return {
        defectiveAssets: action.defectiveAssetsCount,
        message: 'Success'
        };

    default:
      return state;
    }
}
