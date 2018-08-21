import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as assetActions from './assets.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AssetsService } from '../../services/assets/assets.service';
import {GetAllAssetsSuccess,GetAllAssetsError} from './assets.actions';
@Injectable()
export class AssetsEffects {
    constructor(private actions$: Actions,private assetsService:AssetsService) {}
    @Effect()
  createAsset$ = this.actions$
    .ofType(assetActions.CREATE_ASSET)
    .map((action: assetActions.AddAsset) => action.payload)
    .switchMap(newAsset => this.assetsService.createAsset(newAsset))
    .map((response) => new assetActions.AddAssetSuccess(response.id))
    .catch((err) => [new assetActions.AddAssetError(err)]);

    @Effect()
    getAllAsset$: Observable<Action> = this.actions$
      .ofType(assetActions.GET_ASSETS)
      .switchMap(() => this.assetsService.getAllAssets())
      .map(assets =>new GetAllAssetsSuccess(assets))
      .catch((err) => [new GetAllAssetsError(err)]);


      @Effect()
  removeAsset$ = this.actions$
    .ofType(assetActions.DELETE_ASSET)
    .map((action: assetActions.RemoveAsset) => action.payload)
    .switchMap(id => this.assetsService.deleteAsset(id))
    .map((asset:any) => new assetActions.RemoveAssetSuccess(asset))
    .catch((err) => [new assetActions.RemoveAssetError(err)]);

}