import { AppAction } from '../../app.action';
import { ShelterMapInfo } from '../../models/shelter/ShelterMapInfo';

export const SHOW_ALL = '[SHELTER] Show All';
export const SHOW_ALL_SUCCESS = '[SHELTER] Show All Success';
export const CREATE_SHELTER = '[SHELTER] create';
export const CREATE_SHELTER_SUCCESS = '[SHELTER] Create Success';
export const CREATE_SHELTER_ERROR = '[SHELTER] Create Failure';
export const UPDATE_SHELTER = '[SHELTER] Update';
export const UPDATE_SHELTER_SUCCESS = '[SHELTER] Update Success';
export const UPDATE_SHELTER_ERROR = '[SHELTER] Update Failure';
export const DELETE_SHELTER = '[SHELTER] Delete';
export const DELETE_SHELTER_SUCCESS = '[SHELTER] Delete Success';
export const DELETE_SHELTER_ERROR = '[SHELTER] Delete Failure';
export const GET_BY_ID = '[SHELTER] Get by Id';
export const GET_BY_ID_SUCCESS = '[SHELTER] Get by Id Success';

/****************************************
 * Get all  Shelter
 ****************************************/

export class GetAllShelter implements AppAction {
  readonly type = SHOW_ALL;
}


export class GetAllSheltersSuccess implements AppAction {
  readonly type = SHOW_ALL_SUCCESS;

  constructor(public payload: ShelterMapInfo[]) {
  console.log("GET all shelter success action");
 
  }
  
}

/****************************************
 * ADD new Shelter
 ****************************************/

export class AddShelter implements AppAction {
  readonly type = CREATE_SHELTER;
  constructor(public payload: ShelterMapInfo) {
  }
}
export class AddShelterSuccess implements AppAction {
  readonly type = CREATE_SHELTER_SUCCESS;
  constructor(public payload: ShelterMapInfo) {
  }
}

export class AddShelterError implements AppAction {
  readonly type = CREATE_SHELTER_ERROR;
  constructor(public payload: Error) {
  }
}

/****************************************
* Shelter by ID
****************************************/
export class ShelterById implements AppAction {
  readonly type = GET_BY_ID;
  constructor(public payload: string) {}
}
export class ShelterByIdSuccess implements AppAction {
  readonly type = GET_BY_ID_SUCCESS;
  constructor(public payload: ShelterMapInfo[]) {}
}

/****************************************
* update  Shelter
****************************************/

export class UpdateShelter implements AppAction {
  readonly type = CREATE_SHELTER;

  constructor(public payload: ShelterMapInfo) {
  }
}

export class UpdateShelterSuccess implements AppAction {
  readonly type = UPDATE_SHELTER_SUCCESS;

  constructor(public payload: ShelterMapInfo) {
  }
}

export class UpdateShelterError implements AppAction {
  readonly type = UPDATE_SHELTER_ERROR;

  constructor(public payload: Error) {
  }
}


/****************************************
* REMOVE a Shelter by id
****************************************/
export class RemoveShelter implements AppAction {
  readonly type = DELETE_SHELTER;

  constructor(public payload: ShelterMapInfo) {
  }
}

export class RemoveShelterSuccess implements AppAction {
  readonly type = DELETE_SHELTER_SUCCESS;

  constructor(public payload: ShelterMapInfo) {
  }
}

export class RemoveShelterError implements AppAction {
  readonly type = DELETE_SHELTER_ERROR;

  constructor(public payload: Error) {
  }
}

export type ALL_REDUCER_ACTIONS = GetAllSheltersSuccess|AddShelterSuccess| AddShelterError
                 | ShelterByIdSuccess | RemoveShelterSuccess|RemoveShelterError|UpdateShelterSuccess|UpdateShelterError;