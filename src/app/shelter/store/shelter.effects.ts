import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as shelterActions from './shelter.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';

import {GetAllShelter} from './shelter.actions';
import {ShelterService} from '../../services/shelter.service';
import * as ShelterActions from './shelter.actions';
import { switchMap, map } from 'rxjs/operators';
import { ShelterMapInfo } from '../../models/shelter/ShelterMapInfo';


@Injectable()
export class ShelterEffects{
    constructor(
        private actions$: Actions,
        private svc: ShelterService
    ){
      console.log("effects getting called");
    }
    @Effect()
    getAllShelters$:Observable<Action>=this.actions$
    .ofType(ShelterActions.SHOW_ALL)
    .pipe(
        switchMap((()=>this.svc.getAllShelters())),
        map(data =>new shelterActions.GetAllSheltersSuccess(data))
    )

    @Effect()
    createShelter$ = this.actions$
      .ofType(shelterActions.CREATE_SHELTER)
      .pipe(
        map((action: shelterActions.AddShelterSuccess) => action.payload),
        switchMap(newShelter => this.svc.createShelter(newShelter)),
        map((response) => new shelterActions.AddShelterSuccess(response))
        
      )

       @Effect()
    updateShelter$ = this.actions$
      .ofType(shelterActions.UPDATE_SHELTER)
      .pipe(
        map((action: shelterActions.UpdateShelterSuccess) => action.payload),
        switchMap(newShelter => this.svc.updateShelter(newShelter)),
        map((response) => new shelterActions.UpdateShelterSuccess(response.id))
        
      )

        @Effect()
        removeShelters$ = this.actions$
         .ofType(shelterActions.DELETE_SHELTER)
         .pipe(
            map((action: shelterActions.RemoveShelter) => action.payload),
            switchMap(id => this.svc.deleteShelter(id)),
            map((shelter: ShelterMapInfo) => new shelterActions.RemoveShelterSuccess(shelter))
         )

     @Effect() 
  searchShelterById$: Observable<Action> = this.actions$
      .ofType(shelterActions.GET_BY_ID)
      .pipe(
     map((action: shelterActions.ShelterById) => action.payload),
      switchMap(id =>this.svc.shelterById(id)),
         map((shelter: ShelterMapInfo[]) => new shelterActions.ShelterByIdSuccess(shelter))
      ) 

}

