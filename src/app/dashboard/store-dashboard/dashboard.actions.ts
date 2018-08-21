import { Action } from '@ngrx/store';

  export const OPEN_INCIDENTS = '[OpenIncidents] Load OpenIncidents';
  export const OPEN_INCIDENTS_SUCCESS = '[OpenIncidentsCountSuccess] Load Success';

  export const INPROGRESS_INCIDENTS = '[InProgressIncidents] Load InProgressIncidents';
  export const INPROGRESS_INCIDENTS_SUCCESS = '[InProgressIncidentsCountSuccess] Load Success';

  export const TOTAL_RESOURCES = '[TotalResource] Load TotalResource';
  export const TOTAL_RESOURCES_SUCCESS = '[TotalResourceSuccess] Load Success';

  export const AVAILABLE_RESOURCES = '[AvailableResource] Load AvailableResource';
  export const AVAILABLE_RESOURCES_SUCCESS = '[AvailableResourceSuccess] Load AvailableResource';

  export const DEFECTIVE_RESOURCES = '[DefectiveResource] Load DefectiveResource';
  export const DEFECTIVE_RESOURCES_SUCCESS = '[DefectiveResourceSuccess] Load DefectiveResourceSuccess';

  export const TOTAL_ASSETS = '[TotalAssets] Load TotalAssets';
  export const TOTAL_ASSETS_SUCCESS = '[TotalAssetsSuccess] Load TotalAssets';

  export const AVAILABLE_ASSETS = '[AvailableAssets] Load AvailableAssets';
  export const AVAILABLE_ASSETS_SUCCESS = '[AvailableAssetsSuccess] Load AvailableAssets';

  export const DEFECTIVE_ASSETS = '[DefectiveAssets] Load DefectiveAssets';
  export const DEFECTIVE_ASSETS_SUCCESS = '[DefectiveAssetsSuccess] Load DefectiveAssetsSuccess';


export class openIncidents implements Action {
  readonly type = OPEN_INCIDENTS;
}
export class getOpenIncidentsCountSuccess implements Action {
  readonly type = OPEN_INCIDENTS_SUCCESS;
  constructor(public openIncidentsCount: any) {
  }
}

export class inProgressIncidents implements Action {
  readonly type = INPROGRESS_INCIDENTS;
}
export class getInProgressIncidentsSuccess implements Action {
  readonly type = INPROGRESS_INCIDENTS_SUCCESS;
  constructor(public inProgressIncidentsCount: any) {
  }
}

export class totalResource implements Action {
  readonly type = TOTAL_RESOURCES;
}
export class getTotalResourceSuccess implements Action {
    readonly type = TOTAL_RESOURCES_SUCCESS;
    constructor(public totalResourceCount: any) {
    }
}

export class availableResource implements Action {
  readonly type = AVAILABLE_RESOURCES;
}
export class getAvailableResourceSuccess implements Action {
    readonly type = AVAILABLE_RESOURCES_SUCCESS;
    constructor(public availableResourceCount: any) {
    }
}

export class defectiveResource implements Action {
  readonly type = DEFECTIVE_RESOURCES;
}
export class getdefectiveResourceSuccess implements Action {
    readonly type = DEFECTIVE_RESOURCES_SUCCESS;
    constructor(public defectiveResourceCount: any) {
    }
}

export class totalAssets implements Action {
  readonly type = TOTAL_ASSETS;
}
export class gettotalAssetsSuccess implements Action {
    readonly type = TOTAL_ASSETS_SUCCESS;
    constructor(public totalAssetsCount: any) {
    }
}

export class availableAssets implements Action {
  readonly type = AVAILABLE_ASSETS;
}
export class getavailableAssetsSuccess implements Action {
    readonly type = AVAILABLE_ASSETS_SUCCESS;
    constructor(public availableAssetsCount: any) {
    }
}

export class defectiveAssets implements Action {
  readonly type = DEFECTIVE_ASSETS;
}
export class getdefectiveAssetsSuccess implements Action {
    readonly type = DEFECTIVE_ASSETS_SUCCESS;
    constructor(public defectiveAssetsCount: any) {
    }
}

export type DashboardActions = 
openIncidents | 
getOpenIncidentsCountSuccess |
inProgressIncidents |
getInProgressIncidentsSuccess |
totalResource |
getTotalResourceSuccess |
availableResource |
getAvailableResourceSuccess |
defectiveResource |
getdefectiveResourceSuccess |
totalAssets |
gettotalAssetsSuccess |
availableAssets |
getavailableAssetsSuccess |
defectiveAssets |
getdefectiveAssetsSuccess;