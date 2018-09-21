import * as DashboardActionTypes from './dashboard.actions';
import { OpenIncidentsState, InProgressIncidentsState, TotalResourcesState, AvailableResourcesState,AllocatedResourcesState, TotalAssetsState,AvailableAssetsState,DefectiveAssetsState, LiveNewsState, NotificationState } from "src/app/app.state";

export const openIncidentsState: OpenIncidentsState = {
  openIncidents:0,
  message: ''
};

export const inProgressIncidentsState: InProgressIncidentsState = {
  inProgressIncidents:0,
  message: ''
};

export const totalResourcesState: TotalResourcesState = {
  totalResources: {count: 0},
  message: ''
};

export const availableResourcesState: AvailableResourcesState = {
  availableResources:0,
  message: ''
};


export const allocatedResourcesState: AllocatedResourcesState = {
  allocatedResources:0,
  message: ''
};


export const totalAssetsState: TotalAssetsState = {
  totalAssets:{count: 0},
  message: ''
};


export const availableAssetsState: AvailableAssetsState = {
  availableAssets:0,
  message: ''
};

export const defectiveAssetsState: DefectiveAssetsState = {
  defectiveAssets:0,
  message: ''
};

export const liveNewsState: LiveNewsState = {
  liveNewsFeed: [{
    newsdesc:'No News Feed',
  }],message:'No News Feed'
};

export const notificationState: NotificationState = {
  notifications: [{
    desc: 'No Notifications Found',
  }],message:'No Notifications Found'
};

export function openIncidentReducer(state = openIncidentsState, action: DashboardActionTypes.DashboardActions):OpenIncidentsState {
  switch (action.type) {
      case DashboardActionTypes.OPEN_INCIDENTS_SUCCESS:
        return {
        openIncidents: action.openIncidentsCount, message: 'Success'
      };

    default:
      return state;
    }
}

export function inProgressIncidentReducer(state = inProgressIncidentsState, action: DashboardActionTypes.DashboardActions):InProgressIncidentsState {
  switch (action.type) {
    case DashboardActionTypes.INPROGRESS_INCIDENTS_SUCCESS:
    return {
    inProgressIncidents: action.inProgressIncidentsCount, message: 'Success'
    };

    default:
      return state;
    }
}

export function totalResourcesReducer(state = totalResourcesState, action: DashboardActionTypes.DashboardActions):TotalResourcesState {
  switch (action.type) {
    case DashboardActionTypes.TOTAL_RESOURCES_SUCCESS:
    return {
    totalResources: action.totalResourceCount, message: 'Success'
  };

    default:
      return state;
    }
}

export function availableResourcesReducer(state = availableResourcesState, action: DashboardActionTypes.DashboardActions):AvailableResourcesState {
  switch (action.type) {
    case DashboardActionTypes.AVAILABLE_RESOURCES_SUCCESS:
    return {
    availableResources: action.availableResourceCount, message: 'Success'
  };

    default:
      return state;
    }
}

export function allocatedResourcesReducer(state = allocatedResourcesState, action: DashboardActionTypes.DashboardActions):AllocatedResourcesState {
  switch (action.type) {
    case DashboardActionTypes.ALLOCATED_RESOURCES_SUCCESS:
    return {
    allocatedResources: action.allocatedResourceCount, message: 'Success'
  };
  
    default:
      return state;
    }
}

export function totalAssetsReducer(state = totalAssetsState, action: DashboardActionTypes.DashboardActions):TotalAssetsState {
  switch (action.type) {
    case DashboardActionTypes.TOTAL_ASSETS_SUCCESS:
    return {
    totalAssets: action.totalAssetsCount, message: 'Success'
  };
  
    default:
      return state;
    }
}

export function availableAssetsReducer(state = availableAssetsState, action: DashboardActionTypes.DashboardActions):AvailableAssetsState {
  switch (action.type) {
    case DashboardActionTypes.AVAILABLE_ASSETS_SUCCESS:
    return {
    availableAssets: action.availableAssetsCount, message: 'Success'
  };
  
    default:
      return state;
    }
}

export function defectiveAssetsReducer(state = defectiveAssetsState, action: DashboardActionTypes.DashboardActions):DefectiveAssetsState {
  switch (action.type) {
    case DashboardActionTypes.DEFECTIVE_ASSETS_SUCCESS:
    return {
    defectiveAssets: action.defectiveAssetsCount, message: 'Success'
    };
  
    default:
      return state;
    }
}

export function liveNewsFeedReducer(state = liveNewsState, action: DashboardActionTypes.DashboardActions):LiveNewsState {
  switch (action.type) {
    case DashboardActionTypes.LIVE_NEWS_FEED_SUCCESS:
    return {
      liveNewsFeed: action.liveNews, message: 'Success'
    };
  
    default:
      return state;
    }
}

export function notificationReducer(state = notificationState, action: DashboardActionTypes.DashboardActions):NotificationState {
  switch (action.type) {
    case DashboardActionTypes.NOTIFICATIONS_SUCCESS:
    return {
      notifications: action.notificationNews, message: 'Success'
    };
  
    default:
      return state;
    }
}
