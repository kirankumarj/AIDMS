import * as ResourceActions from './resource.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppAction} from '../../app.action';

export interface State{
    data:any[]
}

export const initialState={
    data:[
        // {
        //     id: '1',
        //     name:'Sample1',
        //     latitude: 12.12,
        //     longitude: 43.32,
        //     info: 'Sample1',
        //      type: 'Sample2'
        // }

    ]
}

export function resourceReducer(state=initialState,action:AppAction):State{
    switch (action.type) {
        case ResourceActions.GET_ALL_RESOURCES:
        return{
            ...state
        }
        case ResourceActions.GET_RESOURCES_SUCCESS:
        return {
            ...state,
            data: action.payload
        }

     /*************************
     * Create Resource Actions
     ************************/
    case ResourceActions.CREATE_RESOURCES:
    return {
      ...state
    };
  case ResourceActions.CREATE_RESOURCES_SUCCESS:
    {
      const newResorce = {
        ...state,
        id: action.payload
      };
      const data = [
        ...state.data,
        newResorce
      ];
      return {
        ...state,
        data
      };
    }
    //Delete Org
    case ResourceActions.DELETE_RESOURCES:{
                return {
                    ...state
                }
    }
    case ResourceActions.DELETE_RESOURCES_SUCCESS:{
        const data=state.data.filter((state)=>{
            console.log("From state....");
            console.log(state);
        });
    }
   
    }

     

//        return state;
}

export const getOrganizationsState = createFeatureSelector < State > ('organizations');
export const getAllOrganizations = createSelector(getOrganizationsState, (state: State) => state.data);