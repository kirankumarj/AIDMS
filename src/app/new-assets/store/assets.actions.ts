import {Action} from '@ngrx/store';

export const CREATE_ASSET = '[CREATE] Asset';
export const CREATE_ASSET_SUCCESS = '[CREATE] Asset Success';
export const CREATE_ASSET_ERROR = '[CREATE] Asset Error';



/****************************************
 * ADD new Asset
 ****************************************/
export class AddAsset implements Action {
    readonly type = CREATE_ASSET;
  
    constructor(public payload: any) {
    }
  }
  
  export class AddAssetSuccess implements Action {
    readonly type = CREATE_ASSET_SUCCESS;
  
    constructor(public payload: any) {
      console.log("Payload is :::");
      console.log(payload);
    }
  }
  
  export class AddAssetError implements Action {
    readonly type = CREATE_ASSET_ERROR;
  
    constructor(public payload: Error) {
    }
  }
/****************************************
 * Get All Assets
 ****************************************/

  export const GET_ASSETS = '[ALL] Assets';
export const GET_ASSETS_SUCCESS = '[ALL] Assets Success';
export const GET_ASSETS_ERROR = '[ALL] Assets Error';

export class GetAllAssets implements Action {
  readonly type = GET_ASSETS;
}

export class GetAllAssetsSuccess implements Action {
  readonly type = GET_ASSETS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetAllAssetsError implements Action {
  readonly type = GET_ASSETS_ERROR;

  constructor(public payload: Error) {
  }
}

  /****************************************
 * Remove Asset
 ****************************************/

export const DELETE_ASSET = '[DELETE] Asset';
export const DELETE_ASSET_SUCCESS = '[DELETE] Asset Success';
export const DELETE_ASSET_ERROR = '[DELETE] Asset Error';

export class RemoveAsset implements Action {
  readonly type = DELETE_ASSET;

  constructor(public payload: number) {
  }
}

export class RemoveAssetSuccess implements Action {
  readonly type = DELETE_ASSET_SUCCESS;

  constructor(public payload:any) {
  }
}

export class RemoveAssetError implements Action {
  readonly type =DELETE_ASSET_ERROR;

  constructor(public payload: Error) {
  }
}
