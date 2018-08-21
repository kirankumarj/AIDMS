import * as assetActions from './assets.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
    //data: Game[];
    data: any;
    // selected: Game;
    selected: any;
    action: string;
    done: boolean;
    error?: Error;
  }
  const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
  };

  export function reducer(state = initialState, action: AppAction): State {
    switch (action.type) {

    /*************************
     * CREATE Asset actions
     ************************/
    case assetActions.CREATE_ASSET:
    return {
      ...state,
      selected: action.payload,
      action: assetActions.CREATE_ASSET,
      done: false,
      error: null
    };
  case assetActions.CREATE_ASSET_SUCCESS:
    {
      const newAsset = {
        ...state.selected,
        id: action.payload
      };
      const data = [
        ...state.data,
        newAsset
      ];
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }
  case assetActions.CREATE_ASSET_ERROR:
    return {
      ...state,
      selected: null,
      done: true,
      error: action.payload
    };
        /*************************
     * GET all Assets actions
     ************************/
    case assetActions.GET_ASSETS:
      return {
        ...state,
        action: assetActions.GET_ASSETS,
        done: false,
        selected: null,
        error: null
      };
    case assetActions.GET_ASSETS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case assetActions.GET_ASSETS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
     * DELETE Asset actions
     ************************/
    case assetActions.DELETE_ASSET:
    {
      const selected = state.data.find(h => h.id === action.payload);
      return {
        ...state,
        selected,
        action: assetActions.DELETE_ASSET,
        done: false,
        error: null
      };
    }
  case assetActions.DELETE_ASSET_SUCCESS:
    {
      const data = state.data.filter(h => h.id !== state.selected.id);
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }
  case assetActions.DELETE_ASSET_ERROR:
    return {
      ...state,
      selected: null,
      done: true,
      error: action.payload
    };
    }
  }

  export const getAssetsState = createFeatureSelector < State > ('assets');
export const getAllAssets = createSelector(getAssetsState, (state: State) => {
  console.log("State is .....");
  console.log(state.data);
  return state.data;
});