import { Injectable } from '@angular/core';
import {AppConstants} from '../../app.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class AssetsService {


  constructor(private http:HttpClient) { }
  getCategories(){
    return this.http.get(AppConstants.CATEGORIES_URI);
  }

  createAsset(data){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(AppConstants.ASSETS, data, {headers: headers});

  }
  getAllAssets(){
      return this.http.get(AppConstants.ASSETS);
  }
  deleteAsset(id){
    console.log("From the service :....");
    console.log(id);
    return this.http.delete(AppConstants.ASSETS + '/' + id);
  }
}

