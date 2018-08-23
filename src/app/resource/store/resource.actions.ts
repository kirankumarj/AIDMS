import {AppAction} from '../../app.action';
import { OrgMapInfo } from '../../models/organization/OrgMapInfo';

export const GET_ALL_RESOURCES='[All Resources]';


export class GetAllResources implements AppAction{
    readonly type=GET_ALL_RESOURCES;
}

export const GET_RESOURCES_SUCCESS = '[ALL] Resources Success';

export class GetAllResourcesSuccess implements AppAction {
    readonly type = GET_RESOURCES_SUCCESS;
    constructor(public payload: any) {
    }
  }


export const CREATE_RESOURCES = '[CREATE] Resource';
export const CREATE_RESOURCES_SUCCESS = '[CREATE] Resource Success';
export const CREATE_RESOURCES_ERROR = '[CREATE] Resource Error';



export const DELETE_RESOURCES = '[DELETE] Resource';
export const DELETE_RESOURCES_SUCCESS = '[DELETE] Resource Success';
export const DELETE_RESOURCES_ERROR = '[DELETE] Resource Error';

/****************************************
 * ADD new Resource
 ****************************************/

export class AddResource implements AppAction {
    readonly type = CREATE_RESOURCES;
    constructor(public payload: any) {
    }
  }
  
  export class AddResourceSuccess implements AppAction {
    readonly type = CREATE_RESOURCES_SUCCESS;
    constructor(public payload: any) {
      console.log("Calling for Satae");
    }
  }
  
  export class AddResourceError implements AppAction {
    readonly type = CREATE_RESOURCES_ERROR;
  
    constructor(public payload: Error) {
    }
  }

  /****************************************
 * REMOVE a Resource by id
 ****************************************/
export class RemoveResource implements AppAction {
  readonly type = DELETE_RESOURCES;

  constructor(public payload: any) {
  }
}

export class RemoveResourceSuccess implements AppAction {
  readonly type = DELETE_RESOURCES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class RemoveResourceError implements AppAction {
  readonly type = DELETE_RESOURCES_ERROR;

  constructor(public payload: Error) {
  }
}

