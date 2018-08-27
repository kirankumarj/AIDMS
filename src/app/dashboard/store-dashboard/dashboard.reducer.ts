import * as DashboardActionTypes from './dashboard.actions';
import { OpenIncidentsState, InProgressIncidentsState, TotalResourcesState, AvailableResourcesState,DefectiveResourcesState, TotalAssetsState,AvailableAssetsState,DefectiveAssetsState, LiveNewsState, NotificationState } from "src/app/app.state";

export const openIncidentsState: OpenIncidentsState = {
  openIncidents:9,
  message: ''
};

export const inProgressIncidentsState: InProgressIncidentsState = {
  inProgressIncidents:9,
  message: ''
};

export const totalResourcesState: TotalResourcesState = {
  totalResources:0,
  message: ''
};

export const availableResourcesState: AvailableResourcesState = {
  availableResources:0,
  message: ''
};


export const defectiveResourcesState: DefectiveResourcesState = {
  defectiveResources:0,
  message: ''
};


export const totalAssetsState: TotalAssetsState = {
  totalAssets:0,
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
    news: 'Rainfall over Kerala during Monsoon Season-2018 and forecast for next 5 days',
  },
  {
    news: 'Ministry of Earth Sciences to set up a Cyclone Warning Centre in Thiruvananthapuram',
  },
  {
    news: 'Indian International Science Festival 2018',
  }], message:''
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

export function defectiveResourcesReducer(state = defectiveResourcesState, action: DashboardActionTypes.DashboardActions):DefectiveResourcesState {
  switch (action.type) {
    case DashboardActionTypes.DEFECTIVE_RESOURCES_SUCCESS:
    return {
    defectiveResources: action.defectiveResourceCount, message: 'Success'
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
