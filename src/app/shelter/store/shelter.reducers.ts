import * as ShelterActions from './shelter.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../../app.action';

import { ShelterMapInfo } from '../../models/shelter/ShelterMapInfo';
import { ShelterState } from "src/app/app.state";

export const initialState: ShelterState = { shelters: [], message: '' };

export function shelterReducer(state = initialState, action: ShelterActions.ALL_REDUCER_ACTIONS): ShelterState {
  switch (action.type) {
    case ShelterActions.SHOW_ALL_SUCCESS: {
      return { shelters: action.payload, message: 'Success' };
    }
    case ShelterActions.CREATE_SHELTER_SUCCESS: {
      return { shelters: [action.payload], message: 'Shelter created.' };
    }
    case ShelterActions.UPDATE_SHELTER_SUCCESS: {
      return { shelters: [action.payload], message: 'Shelter updated.' };
    }
    case ShelterActions.DELETE_SHELTER_SUCCESS: {
      return { shelters: [action.payload], message: 'Shelter deleted.' };
    }
    case ShelterActions.GET_BY_ID_SUCCESS: {
      console.log(action.payload);
      return { shelters: action.payload, message: 'Success' };
    }
    default: {
      return state;
    }

  }
}

export const getSheltersState = createFeatureSelector<ShelterState>('shelterState');
export const getAllShelters = createSelector(getSheltersState, (state: ShelterState) => state.shelters);
export const getMessage = createSelector(
  getSheltersState,
  (state: ShelterState) => state.message
);